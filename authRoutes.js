const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
router.post("/register", async (req, res) => {

    const {
        name,
        email,
        address,
        password,
        role
    } = req.body;

    try {

        const hashedPassword =
            await bcrypt.hash(password, 10);

        const sql =
            "INSERT INTO users(name,email,address,password,role) VALUES(?,?,?,?,?)";

        db.query(
            sql,
            [
                name,
                email,
                address,
                hashedPassword,
                role
            ],
            (err, result) => {

                if (err) {
                    return res.status(500).json(err);
                }

                res.json({
                    message:
                        "User Registered Successfully"
                });
            }
        );

    } catch (error) {

        res.status(500).json(error);
    }
});
router.post("/login", (req, res) => {

    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], async (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const user = result[0];

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid Password"
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            "secretkey",
            { expiresIn: "1d" }
        );

        res.json({
            message: "Login Successful",
            token,
            role: user.role
        });
    });
});

router.get("/profile", authMiddleware, (req, res) => {
    res.json({
        message: "Protected Route Accessed",
        user: req.user
    });
});

module.exports = router;

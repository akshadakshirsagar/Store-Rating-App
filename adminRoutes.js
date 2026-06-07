const express = require("express");
const db = require("../db");

const router = express.Router();

router.get("/dashboard", (req, res) => {

    const dashboardData = {};

    db.query(
        "SELECT COUNT(*) AS totalUsers FROM users",
        (err, userResult) => {

            if (err) return res.status(500).json(err);

            dashboardData.totalUsers =
                userResult[0].totalUsers;

            db.query(
                "SELECT COUNT(*) AS totalStores FROM stores",
                (err, storeResult) => {

                    if (err) return res.status(500).json(err);

                    dashboardData.totalStores =
                        storeResult[0].totalStores;

                    db.query(
                        "SELECT COUNT(*) AS totalRatings FROM ratings",
                        (err, ratingResult) => {

                            if (err)
                                return res.status(500).json(err);

                            dashboardData.totalRatings =
                                ratingResult[0].totalRatings;

                            res.json(dashboardData);
                        }
                    );
                }
            );
        }
    );
});
router.post("/add-store", (req, res) => {

    const { name, address, owner_id } = req.body;

    const sql =
        "INSERT INTO stores(name,address,owner_id) VALUES(?,?,?)";

    db.query(
        sql,
        [name, address, owner_id],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Store Added Successfully"
            });
        }
    );
});

router.get("/stores", (req, res) => {

    db.query(
        "SELECT * FROM stores",
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json(result);
        }
    );
});

router.get("/users", (req, res) => {

    db.query(
        "SELECT * FROM users",
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json(result);
        }
    );
});

router.get("/ratings", (req, res) => {

    db.query(
        "SELECT * FROM ratings",
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json(result);
        }
    );
});
module.exports = router;


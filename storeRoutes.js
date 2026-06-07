const express = require("express");
const db = require("../db");

const router = express.Router();

router.get("/", (req, res) => {

    const sql = `
    SELECT
        stores.id,
        stores.name,
        stores.address,
        IFNULL(AVG(ratings.rating),0) AS averageRating
    FROM stores
    LEFT JOIN ratings
    ON stores.id = ratings.store_id
    GROUP BY stores.id
    `;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
});

router.post("/rate", (req, res) => {

    const { user_id, store_id, rating } = req.body;

    if (!user_id || !store_id || !rating) {
        return res.status(400).json({
            message: "user_id, store_id and rating are required"
        });
    }

    const sql =
        "INSERT INTO ratings(user_id, store_id, rating) VALUES(?,?,?)";

    db.query(sql, [user_id, store_id, rating], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Rating Submitted Successfully"
        });
    });
});

router.put("/rate", (req, res) => {

    const { user_id, store_id, rating } = req.body;

    const sql =
        "UPDATE ratings SET rating=? WHERE user_id=? AND store_id=?";

    db.query(
        sql,
        [rating, user_id, store_id],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Rating Updated Successfully"
            });
        }
    );
});

router.get("/owner/:storeId", (req, res) => {

    const storeId = req.params.storeId;

    const sql = `
    SELECT
        stores.name,
        IFNULL(AVG(ratings.rating),0) AS averageRating
    FROM stores
    LEFT JOIN ratings
    ON stores.id = ratings.store_id
    WHERE stores.id = ?
    GROUP BY stores.id
    `;

    db.query(sql, [storeId], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
});

router.get("/owner/:storeId/ratings", (req, res) => {

    const storeId = req.params.storeId;

    const sql = `
    SELECT
        users.name,
        ratings.rating
    FROM ratings
    JOIN users
    ON ratings.user_id = users.id
    WHERE ratings.store_id = ?
    `;

    db.query(sql, [storeId], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
});
module.exports = router;
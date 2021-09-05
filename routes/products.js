const express = require("express");
const pool = require("../db");
const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const { product_name, price } = req.body;
    const newProduct = await pool.query(
      "INSERT INTO product (product_name, price) VALUES ($1, $2) RETURNING *",
      [product_name, price]
    );
    res.json(newProduct)
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;

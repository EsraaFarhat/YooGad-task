const express = require("express");
const pool = require("../db");
const router = express.Router();

// Create a product
router.post("/", async (req, res, next) => {
  try {
    const { product_name, price, seller_id, category_id } = req.body;
    const newProduct = await pool.query(
      "INSERT INTO product (product_name, price, seller_id) VALUES ($1, $2, $3) RETURNING *",
      [product_name, price, seller_id]
    );
    const product_category = await pool.query(
      "INSERT INTO product_category (product_id, category_id) VALUES ($1, $2) RETURNING *",
      [newProduct.rows[0].product_id, category_id]
    );
    res.json(newProduct.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

// List all products
router.get("/", async (req, res, next) => {
  try {
    const products = await pool.query("SELECT * FROM product");

    res.json(products.rows);
  } catch (err) {
    console.log(err.message);
  }
});

// List products related to specific seller
router.get("/seller/:sellerId", async (req, res, next) => {
  const { sellerId } = req.params;
  const categoryId = req.query.category;
  const minPrice = req.query.minPrice || 0;
  const maxPrice = req.query.maxPrice || 1000;
  let query = "";
  let values;

  if (categoryId) {
    query = `SELECT * FROM product AS p, product_category AS pc 
      WHERE seller_id = $1 AND (price BETWEEN $2 AND $3) AND pc.category_id = $4`;
    values = [sellerId, minPrice, maxPrice, categoryId];
  } else {
    query = `SELECT * FROM product 
    WHERE seller_id = $1 AND (price BETWEEN $2 AND $3)`;
    values = [sellerId, minPrice, maxPrice];
  }
  try {
    const products = await pool.query(query, values);

    res.json(products.rows);
  } catch (err) {
    console.log(err.message);
  }
});

// get product by id
router.get("/:productId", async (req, res, next) => {
  const { productId } = req.params;

  try {
    const products = await pool.query(
      "SELECT * FROM product WHERE product_id = $1",
      [productId]
    );

    res.json(products.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

//   Update product by id
router.put("/:productId", async (req, res, next) => {
  const { productId } = req.params;
  const { product_name, price } = req.body;

  let query = "";
  let values;

  if (product_name) {
    query = `UPDATE product SET product_name = $1 WHERE product_id = $2 RETURNING *`;
    values = [product_name, productId];
  } else if (price) {
    query = `UPDATE product SET price = $1 WHERE product_id = $2 RETURNING *`;
    values = [price, productId];
  }
  try {
    const product = await pool.query(query, values);

    res.json(product.rows);
  } catch (err) {
    console.log(err.message);
  }
});

// Delete all products which its creation dates are more than a month ago
router.delete("/", async (req, res, next) => {
  const deletedProducts = await pool.query(
    "DELETE FROM product WHERE ts < NOW() - interval '1 month' RETURNING *"
  );

  res.json(deletedProducts.rows);
});

module.exports = router;

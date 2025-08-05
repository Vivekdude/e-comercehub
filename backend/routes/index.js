const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Define routes
router.get("/products", productController.getProducts);
router.post("/products", productController.createProduct);
router.get("/products/:id", productController.getProductById);

module.exports = router;
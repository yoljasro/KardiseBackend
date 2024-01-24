// src/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

// Barcha mahsulotlarni olish
router.get('/products', productController.getAllProducts);

// Mahsulot qo'shish
router.post('/products', productController.addProduct);

module.exports = router;

// src/controllers/productController.js
const Product = require('../models/product');

// Barcha mahsulotlarni olish
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// Mahsulot qo'shish
const addProduct = async (req, res) => {
  const { name, price, image } = req.body;

  try {
    const newProduct = new Product({ name, price, image });
    await newProduct.save();
    res.json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Product creation failed' });
  }
};

module.exports = {
  getAllProducts,
  addProduct,
};

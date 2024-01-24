// src/app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const productRoutes = require('./src/routers/product');
const {getAllProducts , addProduct} = require("./src/controllers/product.controller")

const app = express();
let port = process.env.PORT || 5000;


// MongoDB-ga ulanish
mongoose.connect('mongodb+srv://saidaliyevjasur450:e2vxdfq0ZpZBINMU@kardiseproject.rbqdzor.mongodb.net', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Mongoose connect error:'));
db.once('open', () => {
  console.log('Mongodb connected');
});

// Express middleware
app.use(express.json());

app.get("/", (req, res) => {
    res.send("hello world. I'm JasurBek");
});


// Product routes
app.get("/product", getAllProducts)
app.post("/product" , addProduct)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

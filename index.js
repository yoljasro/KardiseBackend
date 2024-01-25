const express = require("express");
const app = express();
// const swaggerJSDOC = require("swagger-jsdoc");
// const swaggerUi = require("swagger-ui-express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const { json } = require("body-parser");
const adminRouter = require("./src/routers/admin");
const multer = require("multer");
let port = 5000;
//controller
const { getAllProducts, addProduct } = require("./src/controllers/product.controller") 

app.use(cors());
app.use(json());
app.use("/admin", adminRouter);
app.use('/uploads', express.static('./src/public/uploads'));

// mongodb connect
const uri = "mongodb+srv://saidaliyevjasur450:e2vxdfq0ZpZBINMU@kardiseproject.rbqdzor.mongodb.net";
async function connect() {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB");
  } catch (error) { 
    console.error("Error connecting to MongoDB:", error);
  }
}
connect();


app.get("/", (req, res) => {
  res.send("hello world. I'm JasurBek");
});

// Product routes
app.get("/product", getAllProducts)
app.post("/product", addProduct)

app.listen(port, () => {
  console.log(`Example app is listening on port http://localhost:${port}`);
});
const express = require("express");
const ProductController = require("./controllers/product.controllers");

const app = express();

app.use(express.json());



app.use("/products", ProductController);

module.exports = app;

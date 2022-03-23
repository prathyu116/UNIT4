const express = require("express");
const client = require("../configs/redis");
const Products = require("../models/product.model")
const router = express.Router();
router.post("", async (req, res) => {
    try {
      const product = await Products.create(req.body);
  
      const products = await Products.find().lean().exec();
  
      client.set("products", JSON.stringify(products));
  
      return res.status(201).send(product);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });
  router.get("", async (req, res) => {
    try {
      client.get("products", async function (err, fetchProducts) {
        if (fetchProducts) {
          const products = JSON.parse(fetchProducts);
  
          return res.status(200).send({ products, redis: true });
        } else {
          try {
            const products = await Todo.find().lean().exec();
  
            client.set("products", JSON.stringify(products));
  
            return res.status(200).send({ products, redis: false });
          } catch (err) {
            return res.status(500).send({ message: err.message });
          }
        }
      });
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });

  router.get("/:id", async (req, res) => {
    try {
      client.get(`products.${req.params.id}`, async function (err, fetchProducts) {
        if (fetchProducts) {
          const product = JSON.parse(fetchProducts);
  
          return res.status(200).send({ product, redis: true });
        } else {
          try {
            const product = await Products.findById(req.params.id).lean().exec();
  
            client.set(`products.${req.params.id}`, JSON.stringify(todo));
  
            return res.status(200).send({ product, redis: false });
          } catch (err) {
            return res.status(500).send({ message: err.message });
          }
        }
      });
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });
  

  router.patch("/:id", async (req, res) => {
    try {
      const product = await Products.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      })
        .lean()
        .exec();
  
      const products = await Products.find().lean().exec();
  
      client.set(`products.${req.params.id}`, JSON.stringify(product));
      client.set("products", JSON.stringify(products));
  
      return res.status(200).send(product);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const product = await Products.findByIdAndDelete(req.params.id).lean().exec();
  
      const products = await Products.find().lean().exec();
  
      client.del(`products.${req.params.id}`);
      client.set("products", JSON.stringify(products));
  
      return res.status(200).send(product);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });
module.exports = router;

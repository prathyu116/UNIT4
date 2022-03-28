const express = require("express");

const router = express.Router();
const Todo = require("../models/todo.model");
const authanticate = require("../middleware/authanticate")
const autharise = require("../middleware/autharize")

router.get("", authanticate,async (req, res) => {
  try {
    const getAllTodos = await Todo.find().lean().exec();
    return res.status(200).send(getAllTodos);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
});
router.post("", authanticate,async (req, res) => {
  try {
    const todo = await Todo.create(req.body);
    return res.status(201).send(todo);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
});
router.get("/:id",authanticate,autharise, async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id).lean().exec();
    return res.status(200).send(todo);
  } catch (err) {
    return res.status(401).send({ message: err.message });
  }
});
router.patch("/:id",authanticate,autharise, async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id,req.body,{new:true});
    return res.status(200).send(todo);
  } catch (err) {
    return res.status(401).send({ message: err.message });
  }
});
router.delete("/:id",authanticate,autharise, async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id).lean().exec();
    return res.status(200).send(todo);
  } catch (err) {
    return res.status(401).send({ message: err.message });
  }
});

module.exports = router;

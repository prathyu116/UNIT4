const express = require("express");
const todoContollers = require("./controllers/todo.controller")
const userControllers = require("./controllers/user.controller")
const {
    register,
    login
  } = require("./controllers/auth.controller");
const app =  express()
app.use(express.json());

app.use("/users", userControllers);
app.post("/register", register);
app.post("/login", login);
app.use("/todos", todoContollers);

module.exports = app
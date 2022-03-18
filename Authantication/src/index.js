const express = require("express");
const userController = require("./controllers/user.controller")
const {register,login } = require("./controllers/auth.controller")
const productController = require("./controllers/product.controller")

const app = express()
app.use(express.json())

app.use("/users",userController)
app.post("/register", register)
app.post("/login", login)
app.use("/products", productController)


module.exports=app


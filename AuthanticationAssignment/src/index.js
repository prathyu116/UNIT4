const express = require("express");
const userController = require("./controllers/user.controller")
const {register,login } = require("./controllers/auth.controller")
const posttController = require("./controllers/post.controller")
const { body } = require("express-validator");


const app = express()
app.use(express.json())

app.use("/users",userController)

app.post("/register", body('name')
.not().isEmpty()
.withMessage("name is required"),
body('email')
.isEmail()
.withMessage("email is required"), 
body('password').not()
.isEmpty().withMessage("password Not Empty"),

register)



app.post("/login",body('email')
.isEmail()
.withMessage("email is required"), 
body('password').not()
.isEmpty().withMessage("password Not Empty"),
login)
app.use("/posts", posttController)


module.exports=app


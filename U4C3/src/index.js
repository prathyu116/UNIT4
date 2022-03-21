const express = require("express")
const userController=require("./controllers/UserControler")
const bookController=require("./controllers/BookController")
const publicationController=require("./controllers/publicationController")
const commentController=require("./controllers/comment.controller")

const app = express()
app.use(express.json())
app.use("/users",userController)
app.use("/book",bookController)
app.use("/publication",publicationController)
app.use("/comment",commentController)
module.exports=app
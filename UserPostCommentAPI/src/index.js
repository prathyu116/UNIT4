const express = require("express");

//models
// const User = require("./models/user.model")
// const Post = require("./models/post.model")
// const Comment = require("./models/comment.module")

//controller
const usersController = require("./controler/user.controler")
const postsController=require("./controler/post.controler")
const commentsController = require("./controler/comment.controller")
 


const app = express();
app.use(express.json());


app.use("/users",usersController)
app.use("/posts",postsController)
app.use("/comments",commentsController)



 module.exports=app

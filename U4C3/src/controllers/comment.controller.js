const express = require("express");

const Comment = require("../models/CommentModel")
const router = express.Router()


router.post("/",async(req,res)=>{
  try{

    const book = await Comment.create(req.body)
    return res.send(book)
  }catch(err){
      return res.send({message:err.message})
  }
})

module.exports=router
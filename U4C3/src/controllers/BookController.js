const express = require("express");
const { body, validationResult } = require('express-validator');

const Book = require("../models/BookModel")
const router = express.Router()


router.post("/",
body('coverImage').not().isEmpty().isLength(1).withMessage("it can be 1 only"),


async(req,res)=>{
  try{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const book = await Book.create(req.body)
    return res.send(book)
  }catch(err){
      return res.send({message:err.message})
  }
})

module.exports=router
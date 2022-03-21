const express = require("express");

const Publication = require("../models/Publication Model")
const router = express.Router()


router.post("/",async(req,res)=>{
  try{

    const book = await Publication.create(req.body)
    return res.send(book)
  }catch(err){
      return res.send({message:err.message})
  }
})

module.exports=router
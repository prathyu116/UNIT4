const express = require("express");
const { body, validationResult } = require('express-validator');

const User = require("../models/User.Model")
const router = express.Router()

// router("")

router.post("/",
body('firstName').not().isEmpty().isLength({ min: 3 ,max:30}).withMessage("min 3 and max 30"),
body('age').not().isEmpty().isLength({ min: 1 ,max:150}).withMessage("age between range 1-150"),
body('profileImages').not().isEmpty().withMessage("aatleast 1 profile image is required"),


async(req,res)=>{
  try{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const user = await User.create(req.body)
    return res.send(user)
  }catch(err){
      return res.send({message:err.message})
  }
})

module.exports=router
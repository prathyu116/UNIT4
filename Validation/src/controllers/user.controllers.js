const express = require("express");
const { body, validationResult } = require("express-validator");

const User = require("../models/user.models");

const router = express.Router();




 

router.post("/",
body('firstName').not().isEmpty()
.withMessage("firname is required"),
body('lastName').not().isEmpty()
.withMessage("lastName is required"),
body("email").isEmail().withMessage("should be a valid email"),
body('pincode').not().isEmpty().withMessage("PIN required").isLength(6).withMessage("should 6 digit"),
body("gender")
.not()
.isEmpty()
.withMessage("gender is required")
.custom((value) => {
  if (value!="Male" || value != "Female" || value != "Others") {
    throw new Error("either Male, Female or Others");
  }
  return true;
}),

async(req,res)=>{
  try{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const user = await User.create(req.body)
    return res.status(200).send(user)
  }catch(err){
    return res.status(500).send({message:err.message})
  }
})


module.exports = router;

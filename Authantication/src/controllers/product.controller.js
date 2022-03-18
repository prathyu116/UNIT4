const express = require("express")
const router = express.Router();
const Product = require("../models/product.model")
const authenticate = require("../middleware/authenticate")


router.post("",  authenticate,async (req, res) => {
    req.body.user_id = req.userID;
    try{
        const product = await Product.create(req.body)
        return res.status(200).send(product)
    }
    catch(err){
        return res.status(400).send({message : err.message})
    }
 
})

module.exports = router;
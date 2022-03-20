const mongoose = require("mongoose")

const fixedSchema = new mongoose.Schema({
    masterId:{type:mongoose.Schema.Types.ObjectId,ref:"master",required:true,unique:true},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"user",required:true},
    accNum:{type:Number,required:true,unique:true},
    interestRate:{type:Number,required:true},
    balance:{type:Number,required:true},
    startDate:{type:String,required:true},
    maturityDate:{type:String,required:true}
},  {
    versionKey: false,
    timestamps: true,
  })

module.exports=  mongoose.model('fixed',fixedSchema)
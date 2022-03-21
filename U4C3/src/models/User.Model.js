const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String},
    age:{type:Number,required:true},
    email:{type:String,required:true,unique: true },
    profileImages:[{type:String,required:true}],
},{
    versionKey:false,
    timestamps:true
})

module.exports = mongoose.model("user",UserSchema)
const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    body:{type:String,required:true},
    bookId:{type:mongoose.Schema.Types.ObjectId,ref:"book"},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"user"},

},{
    versionKey:false,
    timestamps:true
})

module.exports = mongoose.model("user",UserSchema)
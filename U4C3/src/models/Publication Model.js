const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name:{type:String,required:true},
    bookId:{type:mongoose.Schema.Types.ObjectId,ref:"book"},

},{
    versionKey:false,
    timestamps:true
})

module.exports = mongoose.model("publication",UserSchema)
const mongoose = require("mongoose");

const BookSchema = mongoose.Schema({
    likes:{type:Number,default:0},
    coverImage:{type:String,required:true},
    content:{type:String,required:true},
    publicationId:{type:mongoose.Schema.Types.ObjectId,ref:"publication"},
    
},{
    versionKey:false,
    timestamps:true
})

module.exports = mongoose.model("book",BookSchema)
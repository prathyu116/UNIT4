const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
    body:{type:String,required:true},
    bookId:{type:mongoose.Schema.Types.ObjectId,ref:"book"},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"user"},

},{
    versionKey:false,
    timestamps:true
})

module.exports = mongoose.model("comment",CommentSchema)
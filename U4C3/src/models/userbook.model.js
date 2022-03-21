const mongoose = require("mongoose");

const UserBookSchema = mongoose.Schema({

    bookId:{type:mongoose.Schema.Types.ObjectId,ref:"book"},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"user"}
},{
    versionKey:false,
    timestamps:true
})

module.exports = mongoose.model("user-book",UserBookSchema)
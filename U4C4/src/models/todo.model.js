const  mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
    title : {type:String , required:true},
    userId : { type: mongoose.Schema.Types.ObjectId, ref: 'user',required:true },

},{
    timestamps:true,
    versionKey:false
})

const Todo  = mongoose.model("todo",TodoSchema)
module.exports = Todo
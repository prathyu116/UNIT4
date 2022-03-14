const mongoose = require("mongoose");


const commentSchema = new mongoose.Schema(
    {
      body: { type: String, required: true },
      postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
        required: true,
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
    },
    {
      versionKey: false,
      timestamps: true,
    }
  );
  
  // Step 2 :- creating the model
  const Comment = mongoose.model("comment", commentSchema);

  module.exports = Comment
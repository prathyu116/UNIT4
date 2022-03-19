const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: false },
    email: { type: String, required: true},
    pincode: { type: String, required: true },
    gender: {
      type: String,
      enum: ["Male", "Female","Othors"],
      default: "Male",
    },
    age: { type: Number, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);

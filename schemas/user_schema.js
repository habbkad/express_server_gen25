const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Email is not correct",
    ],
    unique: true,
    required: [true, "Email not provided"],
  },
  password: {
    type: String,
    required: true,
  },
  user: {
    required: true,
    type: String,
    enum: ["admin", "customer", "representative"],
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;

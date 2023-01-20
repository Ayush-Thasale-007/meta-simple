const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name!"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  collegeName: {
    type: String,
  },
  contact: {
    type: String,
    required: [true, "Please Provide your Contact Number"],
  },
  yearOfStudy: {
    type: String,
    required: [true],
  },
  choice: {
    type: String,
    required: [true],
    enum: ["docker", "go", "both"],
  },
  bootedLaptops: {
    type: Boolean,
  },
  paymentID: {
    type: String,
  },
});

userSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;

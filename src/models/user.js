const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 20,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address : " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender Data not correct");
        }
      },
    },
    about: {
      type: String,
      default: "This is default about",
      maxLength: 200,
    },
    photoUrl: {
      type: String,
      default: "This is default photoUrl",
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true }
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, "DEVTINDER@$7988", {
    expiresIn: "7d",
  });
  return token;
};

userSchema.methods.validatePassword = async function (userTypedPassword) {
  const user = this;

  const isPasswordValid = await bcrypt.compare(
    userTypedPassword,
    user.password
  );

  return isPasswordValid;
};

const User = mongoose.model("User", userSchema);

module.exports = User;

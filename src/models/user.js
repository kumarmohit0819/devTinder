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
      required: true,
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      required: true,
      enum: {
        values: ["male", "female", "others"],
        message: `{VALUE} is not valid gender type`,
      },
    },
    about: {
      required: true,
      type: String,
      default: "This is default about",
      maxLength: 200,
    },
    profilePhotos: {
      type: [String],
      required: true,
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true }
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
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

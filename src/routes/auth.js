const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { vadlidateSignupData } = require("../utils/validations");
const User = require("../models/user");

router.post("/signup", async (req, res) => {
  console.log(req.body);
  try {
    vadlidateSignupData(req);

    const {
      firstName,
      lastName,
      emailId,
      password,
      gender,
      age,
      photoUrl,
      skills,
    } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      gender,
      password: passwordHash,
      age,
      photoUrl,
      skills,
    });

    await user.save();
    res.send({ message: "User added successfully", data: "" });
  } catch (err) {
    res.status(400).send("USER SIGNUP FAILED : " + err.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Invalid Credentials!");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      throw new Error("Invalid Credentials!");
    } else {
      const token = await user.getJWT();

      res.cookie("token", token);
      res.send({ message: "Login successfull", data: "" });
    }
  } catch (err) {
    res.status(400).send("LOGIN FAILED : " + err.message);
  }
});

router.post("/logout", (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send({ message: "logout successfull", data: "" });
});

module.exports = router;

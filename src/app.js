const express = require("express");
const connectDB = require("./config/datatbase");
const app = express();
const User = require("./models/user");
const { vadlidateSignupData } = require("./utils/validations");
const bcrypt = require("bcrypt");

app.use(express.json());

app.post("/signup", async (req, res) => {
  console.log(req.body);
  try {
    vadlidateSignupData(req);

    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("USER SIGNUP FAILED : " + err.message);
  }
});

app.get("/feed", (req, res) => {});

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    if (data?.skills.length > 10) {
      throw new Error("Skills cannot be more than 10");
    }
    const user = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
      runValidator: true,
    });
    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("UPDATE FAILED : " + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connection established.");
    app.listen(3000, () => {
      console.log("listening on http://localhost on port 3000");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected.");
  });

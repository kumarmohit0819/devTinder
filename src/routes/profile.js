const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/auth");
const { valiudateEditData } = require("../utils/validations");

router.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send({ message: "User Profile ", data: user });
  } catch (err) {
    res.status(400).send("PROFILE LOADING FAILED : " + err.message);
  }
});

router.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!valiudateEditData(req)) {
      throw new Error("Invalid Edit data");
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName} your, profile updated successfully`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("UPDATE FAILED : " + err.message);
  }
});

module.exports = router;

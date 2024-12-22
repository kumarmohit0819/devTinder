const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");

const USER_SAFE_DATA = [
  "firstName",
  "lastName",
  "photoUrl",
  "about",
  "skills",
  "gender",
  "age",
];

router.get("/user/requests/recieved", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA);

    res.json({ message: "Connection requests", data: connectionRequest });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

router.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connections = await ConnectionRequest.find({
      $or: [
        { status: "accepted", toUserId: loggedInUser },
        { status: "accepted", fromUserId: loggedInUser },
      ],
    }).populate("fromUserId", USER_SAFE_DATA);
    const data = connections.map((key) => key.fromUserId);
    res.json({ message: "Connections ", data: data });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

module.exports = router;

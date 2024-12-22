const express = require("express");
const connectDB = require("./config/datatbase");
const app = express();
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use(express.json());
app.use(cookieParser());

app.use(authRouter);
app.use(profileRouter);
app.use(requestRouter); 
app.use(userRouter)

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

require("dotenv").config();
const express = require("express");
const connectDB = require("./config/datatbase");
const app = express();
const SITE_BASE_URL = process.env.SITE_BASE_URL;
const PORT = process.env.PORT || 3000;
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const cors = require("cors");

app.use(
  cors({
    origin: `${SITE_BASE_URL} : ${PORT}`,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(authRouter);
app.use(profileRouter);
app.use(requestRouter);
app.use(userRouter);

connectDB()
  .then(() => {
    console.log("Database connection established.");
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected.");
  });

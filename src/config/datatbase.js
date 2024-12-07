const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://mohitnode:wq9tsaFSWXAr8VIZ@mohitnode.yo99f.mongodb.net/devTinder"
  );
};

module.exports = connectDB;

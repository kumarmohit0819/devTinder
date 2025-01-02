const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(process.env.DATA_BASE_URL);
};

module.exports = connectDB;

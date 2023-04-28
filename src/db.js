const { MONGODB_URI } = process.env;

const mongoose = require("mongoose");

// Connection options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectToDB = async () => {
  // Connect to the database
  await mongoose
    .connect(MONGODB_URI, options)
    .then(() => {
      ("MongoDB connected successfully");
    })
    .catch((error) => {
      console.error("MongoDB connection error:", error);
    });
};

module.exports = { connectToDB };

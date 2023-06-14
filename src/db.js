const { MONGODB_URI } = process.env;

const mongoose = require("mongoose");

// Connection options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectToDB = async () => {
  // Connect to the database
  try {
    await mongoose.connect(MONGODB_URI, options);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

const disconnectDB = async () => {
  await mongoose.disconnect();
};

module.exports = { connectToDB, disconnectDB };

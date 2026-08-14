const mongoose = require("mongoose");

// Connects to MongoDB using the MONGO_URI from .env
// Works with local MongoDB (mongodb://127.0.0.1:27017/school_management)
// or MongoDB Atlas (mongodb+srv://...)
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;

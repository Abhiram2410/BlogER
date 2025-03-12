const mongoose = require("mongoose");
const colors = require("colors"); // Import colors package

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.bold); // Use colors safely
  } catch (error) {
    console.error(`Error: ${error.message}`.red.bold);
    process.exit(1);
  }
};

module.exports = connectDB;

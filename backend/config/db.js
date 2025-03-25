require("dotenv").config(); // Load environment variables
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        console.log("🔍 Checking MONGO_URI:", process.env.MONGO_URI); // Debugging
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("🔥 MongoDB Atlas Connected Successfully!");
    } catch (error) {
        console.error("❌ MongoDB Connection Failed:", error);
        process.exit(1);
    }
};

module.exports = connectDB;

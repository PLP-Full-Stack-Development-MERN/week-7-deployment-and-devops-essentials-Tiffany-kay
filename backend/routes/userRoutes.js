const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const router = express.Router();

// ✅ Register a new user
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Get all users (for admin)
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Hide password
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;

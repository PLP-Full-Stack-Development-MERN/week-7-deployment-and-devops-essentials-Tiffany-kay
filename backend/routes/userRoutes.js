const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Middleware to Verify Token
const verifyToken = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ error: "Access denied!" });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ error: "Invalid token!" });
    }
};

// Get All Users (Admin Access)
router.get("/", async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// Get User by ID
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) return res.status(404).json({ error: "User not found!" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// Update User Profile (Protected)
router.put("/:id", verifyToken, async (req, res) => {
    try {
        if (req.user.id !== req.params.id) return res.status(403).json({ error: "Unauthorized!" });

        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select("-password");
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// Delete User (Protected)
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        if (req.user.id !== req.params.id) return res.status(403).json({ error: "Unauthorized!" });

        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "User deleted successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;

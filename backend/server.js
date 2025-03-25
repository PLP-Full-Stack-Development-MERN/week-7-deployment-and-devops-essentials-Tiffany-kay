require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Initialize Express
const app = express();

// Middleware
app.use(express.json()); // Allow JSON requests
app.use(cors()); // Allow cross-origin requests

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB Atlas"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// Blog Schema
const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});
const Blog = mongoose.model("Blog", blogSchema);

// Routes
app.get("/", (req, res) => {
    res.send("🚀 MERN Blog Platform Backend is running!");
});

// Fetch all blogs
app.get("/blogs", async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// Create a new blog
app.post("/blogs", async (req, res) => {
    try {
        const { title, content, author, category } = req.body;
        if (!title || !content || !author || !category) {
            return res.status(400).json({ error: "All fields are required!" });
        }
        const newBlog = new Blog({ title, content, author, category });
        await newBlog.save();
        res.status(201).json(newBlog);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});

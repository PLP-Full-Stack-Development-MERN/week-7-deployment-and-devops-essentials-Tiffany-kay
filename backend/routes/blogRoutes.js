const express = require("express");
const Blog = require("../models/Blog");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Get All Blogs (Public)
router.get("/", async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// ✅ Create a Blog (Only Authenticated Users)
router.post("/", verifyToken, async (req, res) => {
    try {
        const newBlog = new Blog({ ...req.body, author: req.user.id });
        await newBlog.save();
        res.status(201).json(newBlog);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// ✅ Update a Blog (Only Author)
router.put("/:id", verifyToken, async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (blog.author.toString() !== req.user.id) {
            return res.status(403).json("You can only update your own blogs!");
        }

        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedBlog);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// ✅ Delete a Blog (Only Author)
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (blog.author.toString() !== req.user.id) {
            return res.status(403).json("You can only delete your own blogs!");
        }

        await Blog.findByIdAndDelete(req.params.id);
        res.json({ message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;

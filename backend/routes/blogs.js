const express = require("express");
const Blog = require("../models/Blog");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Middleware to verify token
const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) return res.status(403).json("Access Denied");

    jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(401).json("Invalid Token");
        req.user = user;
        next();
    });
};

// 🔹 Create a Blog
router.post("/", verifyToken, async (req, res) => {
    try {
        const newBlog = new Blog({
            title: req.body.title,
            content: req.body.content,
            author: req.body.author, // Keeping it a string as per your schema
            category: req.body.category,
            tags: req.body.tags || [],
            published: req.body.published || false,
        });

        const blog = await newBlog.save();
        res.status(201).json(blog);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 🔹 Get All Blogs
router.get("/", async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 }); // Newest first
        res.status(200).json(blogs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 🔹 Get Blog by ID
router.get("/:id", async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json("Blog not found");

        res.status(200).json(blog);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 🔹 Update Blog
router.put("/:id", verifyToken, async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json("Blog not found");

        // Only update fields that are provided in request body
        blog.title = req.body.title || blog.title;
        blog.content = req.body.content || blog.content;
        blog.category = req.body.category || blog.category;
        blog.tags = req.body.tags || blog.tags;
        blog.published = req.body.published !== undefined ? req.body.published : blog.published;

        const updatedBlog = await blog.save();
        res.status(200).json(updatedBlog);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 🔹 Delete Blog
router.delete("/:id", verifyToken, async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json("Blog not found");

        await blog.deleteOne();
        res.status(200).json("Blog deleted");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

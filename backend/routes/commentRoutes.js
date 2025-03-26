const express = require("express");
const Comment = require("../models/Comment");

const router = express.Router();

// ✅ Add a comment to a blog
router.post("/:blogId", async (req, res) => {
  try {
    const { author, content } = req.body;
    const newComment = new Comment({ blogId: req.params.blogId, author, content });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Get comments for a specific blog
router.get("/:blogId", async (req, res) => {
  try {
    const comments = await Comment.find({ blogId: req.params.blogId });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;

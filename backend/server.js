require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const winston = require("winston");
const expressAsyncHandler = require("express-async-handler");

// Initialize Express
const app = express();

// Middleware
app.use(express.json()); // Allow JSON requests
app.use(cors()); // Enable cross-origin requests

// Logging setup with Winston
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

app.use(morgan("combined", { stream: { write: (message) => logger.info(message) } }));

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB Atlas"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// Blog Schema
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  tags: [{ type: String }],  // Added optional tags
  published: { type: Boolean, default: false },  // Added published field
}, { timestamps: true });

const Blog = mongoose.model("Blog", blogSchema);

// Base Route
app.get("/", (req, res) => {
  res.send("🚀 MERN Blog Platform Backend is running!");
});

// Fetch all blogs
app.get("/api/v1/blogs", expressAsyncHandler(async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 }); // Newest first
  res.status(200).json(blogs);
}));

// Fetch a single blog by ID
app.get("/api/v1/blogs/:id", expressAsyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).json({ error: "Blog not found" });
  res.status(200).json(blog);
}));

// Create a new blog
app.post("/api/v1/blogs", expressAsyncHandler(async (req, res) => {
  const { title, content, author, category, tags, published } = req.body;

  if (!title || !content || !author || !category) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  const newBlog = new Blog({ title, content, author, category, tags, published });
  await newBlog.save();

  res.status(201).json(newBlog);
}));

// Update a blog
app.put("/api/v1/blogs/:id", expressAsyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).json({ error: "Blog not found" });

  blog.title = req.body.title || blog.title;
  blog.content = req.body.content || blog.content;
  blog.category = req.body.category || blog.category;
  blog.tags = req.body.tags || blog.tags;
  blog.published = req.body.published !== undefined ? req.body.published : blog.published;

  const updatedBlog = await blog.save();
  res.status(200).json(updatedBlog);
}));

// Delete a blog
app.delete("/api/v1/blogs/:id", expressAsyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).json({ error: "Blog not found" });

  await blog.deleteOne();
  res.status(200).json({ message: "Blog deleted" });
}));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

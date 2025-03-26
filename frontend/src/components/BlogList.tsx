import React, { useContext } from "react";
import { BlogContext } from "../context/BlogContext";
import { Blog } from "../types";

const BlogList: React.FC = () => {
  const context = useContext(BlogContext);

  if (!context) {
    throw new Error("BlogList must be used within a BlogProvider");
  }

  const { blogs } = context;

  return (
    <div>
      {blogs.length > 0 ? (
        blogs.map((blog: Blog) => (
          <div key={blog._id}>
            <h2>{blog.title}</h2>
            <p>{blog.content}</p>
            <small>By {blog.author}</small>
          </div>
        ))
      ) : (
        <p>No blogs available</p>
      )}
    </div>
  );
};

export default BlogList;

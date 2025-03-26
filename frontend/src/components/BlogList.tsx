import React from "react";
import { Blog } from "../context/BlogContext";
import { Link } from "react-router-dom";

interface BlogListProps {
  blogs: Blog[];
}

const BlogList: React.FC<BlogListProps> = ({ blogs }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((blog) => (
        <div key={blog._id} className="border p-4 rounded-md shadow-md">
          <h2 className="text-xl font-semibold">{blog.title}</h2>
          <p className="text-gray-600">By {blog.author}</p>
          <Link
            to={`/blogs/${blog._id}`}
            className="text-blue-500 hover:underline"
          >
            Read More
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BlogList;

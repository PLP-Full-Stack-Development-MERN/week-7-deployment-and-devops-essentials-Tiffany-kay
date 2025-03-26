import React, { useContext } from "react";
import { BlogContext } from "../context/BlogContext";
import BlogList from "../components/BlogList";

const Blogs: React.FC = () => {
  const blogContext = useContext(BlogContext);

  if (!blogContext) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  const { blogs } = blogContext;

  if (!blogs || blogs.length === 0) {
    return <p className="text-center text-gray-500">No blogs found...</p>;
  }

  return (
    <div className="container mx-auto mt-6">
      <h1 className="text-3xl font-bold text-center mb-4">📚 Latest Blogs</h1>
      <BlogList blogs={blogs} />
    </div>
  );
};

export default Blogs;

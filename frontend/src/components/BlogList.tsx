import React, { useContext } from "react";
import { BlogContext } from "../context/BlogContext";

const BlogList: React.FC = () => {
    const blogContext = useContext(BlogContext);

    if (!blogContext) return <p>Loading...</p>;

    return (
        <div className="blog-list">
            {blogContext.blogs.map((blog) => (
                <div key={blog._id} className="blog-card">
                    <h2>{blog.title}</h2>
                    <p>{blog.content.slice(0, 100)}...</p>
                    <small>By {blog.author} | {new Date(blog.createdAt).toLocaleDateString()}</small>
                </div>
            ))}
        </div>
    );
};

export default BlogList;

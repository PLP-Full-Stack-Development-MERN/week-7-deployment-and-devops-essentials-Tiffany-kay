import React, { createContext, useState, useEffect } from "react";
import { getBlogs } from "../api";
import { Blog } from "../types";

interface BlogContextType {
    blogs: Blog[];
    fetchBlogs: () => void;
}

export const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [blogs, setBlogs] = useState<Blog[]>([]);

    const fetchBlogs = async () => {
        try {
            const response = await getBlogs();
            setBlogs(response.data);
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    console.log("Blogs in context:", blogs);

    return (
        <BlogContext.Provider value={{ blogs, fetchBlogs }}>
            {children}
        </BlogContext.Provider>
    );
};

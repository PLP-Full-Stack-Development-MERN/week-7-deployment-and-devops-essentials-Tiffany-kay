import { createContext, useState, useEffect } from "react";

export interface User {
    _id: string;
    username: string;
    email: string;
    token: string;
}

export interface Blog {
    _id: string;
    title: string;
    content: string;
    author: string;
    category: string;
    tags?: string[];
    published?: boolean;
    createdAt: string;
}

export interface Comment {
    _id: string;
    blogId: string;
    user: string;
    content: string;
    createdAt: string;
}

interface BlogContextType {
    user: User | null;
    blogs: Blog[];
    comments: Comment[];
    login: (email: string, password: string) => Promise<void>;
    register: (username: string, email: string, password: string) => Promise<void>;
    logout: () => void;
    loadBlogs: () => void;
    addBlog: (blog: Omit<Blog, "_id" | "createdAt">) => Promise<void>;
    deleteBlog: (blogId: string) => Promise<void>;
    addComment: (blogId: string, content: string) => Promise<void>;
}

export const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        loadBlogs();
    }, []);

    const login = async (email: string, password: string) => {
        const res = await fetch("https://mern-blog-app-f9au.onrender.com/api/v1/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (!res.ok) throw new Error("Login failed");

        const data = await res.json();
        setUser(data.user);
        localStorage.setItem("token", data.token);
    };

    const register = async (username: string, email: string, password: string) => {
        const res = await fetch("https://mern-blog-app-f9au.onrender.com/api/v1/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password }),
        });

        if (!res.ok) throw new Error("Registration failed");

        const data = await res.json();
        setUser(data);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
    };

    const loadBlogs = async () => {
        const res = await fetch("https://mern-blog-app-f9au.onrender.com/api/v1/blogs");
        const data = await res.json();
        setBlogs(data);
    };

    const addBlog = async (blog: Omit<Blog, "_id" | "createdAt">) => {
        const res = await fetch("https://mern-blog-app-f9au.onrender.com/api/v1/blogs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blog),
        });

        if (!res.ok) throw new Error("Failed to add blog");

        const newBlog = await res.json();
        setBlogs((prev) => [...prev, newBlog]);
    };

    const deleteBlog = async (blogId: string) => {
        await fetch(`https://mern-blog-app-f9au.onrender.com/api/v1/blogs/${blogId}`, { method: "DELETE" });
        setBlogs((prev) => prev.filter((blog) => blog._id !== blogId));
    };

    const addComment = async (blogId: string, content: string) => {
        const res = await fetch(`https://mern-blog-app-f9au.onrender.com/api/v1/comments`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ blogId, user: user?.username, content }),
        });

        if (!res.ok) throw new Error("Failed to add comment");

        const newComment = await res.json();
        setComments((prev) => [...prev, newComment]);
    };

    return (
        <BlogContext.Provider value={{ user, blogs, comments, login, register, logout, loadBlogs, addBlog, deleteBlog, addComment }}>
            {children}
        </BlogContext.Provider>
    );
};

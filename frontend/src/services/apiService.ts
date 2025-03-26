import axios from "axios";

const BASE_URL = "https://mern-blog-app-f9au.onrender.com/api/v1";

// 📝 Register User
export const registerUser = async (userData: { username: string; email: string; password: string }) => {
    const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });
    return res.json();
};

// 🔑 Login User
export const loginUser = async (credentials: { email: string; password: string }) => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
    });

    if (!res.ok) {
        throw new Error("Login failed"); // Handle wrong password/user not found
    }

    return res.json();
};

// 🏡 Get All Blogs
export const fetchBlogs = async () => {
    const res = await fetch(`${BASE_URL}/blogs`);
    return res.json();
};

// 🔒 Authenticated Request Example (Create Blog)
export const createBlog = async (blogData: any, token: string) => {
    const res = await fetch(`${BASE_URL}/blogs`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(blogData),
    });

    if (!res.ok) {
        throw new Error("Failed to create blog");
    }

    return res.json();
};

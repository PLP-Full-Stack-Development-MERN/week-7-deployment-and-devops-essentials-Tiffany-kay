import axios from "axios";
import { Blog } from "./types";

const API_URL = "https://mern-blog-app-f9au.onrender.com/api/v1/blogs";

// Get the token from localStorage (or any other storage mechanism)
const getToken = () => localStorage.getItem("token");

export const getBlogs = () =>
  axios.get(API_URL, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });

export const createBlog = (blog: Omit<Blog, "_id" | "createdAt">) =>
  axios.post(API_URL, blog, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });

export const updateBlog = (id: string, blog: Partial<Blog>) =>
  axios.put(`${API_URL}/${id}`, blog, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });

export const deleteBlog = (id: string) =>
  axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });

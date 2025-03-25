import axios from "axios";
import { Blog } from "./types";

const API_URL = "http://localhost:5000/blogs"; // Replace with deployed URL

export const getBlogs = () => axios.get(API_URL);
export const createBlog = (blog: Omit<Blog, "_id" | "createdAt">) => axios.post(API_URL, blog);
export const updateBlog = (id: string, blog: Partial<Blog>) => axios.put(`${API_URL}/${id}`, blog);
export const deleteBlog = (id: string) => axios.delete(`${API_URL}/${id}`);

import { useState, useContext } from "react";
import { BlogContext } from "../context/BlogContext";

const AddBlog = () => {
    const { addBlog } = useContext(BlogContext)!;
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await addBlog({ title, content, author: "Admin", category });
    };

    return (
        <div>
            <h2>Add Blog</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
                <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
                <button type="submit">Add Blog</button>
            </form>
        </div>
    );
};

export default AddBlog;

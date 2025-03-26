import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddBlog from "./pages/AddBlog";
import { BlogProvider } from "./context/BlogContext";
import "./App.css"; // Styling file

const App: React.FC = () => {
    return (
        <BlogProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/blogs" element={<Blogs />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/add-blog" element={<AddBlog />} />
                </Routes>
            </Router>
        </BlogProvider>
    );
};

export default App;

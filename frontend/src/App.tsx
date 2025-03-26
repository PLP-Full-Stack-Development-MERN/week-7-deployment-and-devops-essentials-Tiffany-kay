import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BlogProvider } from "./context/BlogContext";
import Home from "./pages/Home";
import "./App.css"; // Styling file

const App: React.FC = () => {
    return (
        <BlogProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </Router>
        </BlogProvider>
    );
};

export default App;

import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
    return (
        <div>
            <h1>Welcome to MERN Blog</h1>
            <p>Explore tech blogs, share your thoughts, and connect with other developers.</p>
            <Link to="/blogs">
                <button>View Blogs</button>
            </Link>
        </div>
    );
};

export default Home;

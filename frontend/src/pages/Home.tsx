import React from "react";
import BlogList from "../components/BlogList";

const Home: React.FC = () => {
    console.log("Home component is rendering");
    return (
        <div className="home">
            <h1>Latest Blog Posts</h1>
            <BlogList />
        </div>
    );
};

export default Home;

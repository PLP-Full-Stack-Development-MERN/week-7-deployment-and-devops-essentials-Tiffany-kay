import { Link } from "react-router-dom";
import { useContext } from "react";
import { BlogContext } from "../context/BlogContext";

const Navbar = () => {
    const { user, logout } = useContext(BlogContext)!;

    return (
        <nav>
            <h1>MERN Blog</h1>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/blogs">Blogs</Link></li>
                {user ? (
                    <>
                        <li><Link to="/add-blog">New Blog</Link></li>
                        <li><button onClick={logout}>Logout</button></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;

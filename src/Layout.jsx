import { Link } from "react-router-dom";
import "./Layout.css";

function Layout({ children }) {
    return (
        <>
            <nav className="navbar">
                <Link to="/" className="logo">
                    🍴 Recipe Box
                </Link>

                <div className="nav-links">
                    <Link to="/">Recipes</Link>
                    <Link to="/recipe/new">Add Recipe</Link>
                </div>
            </nav>

            {children}
        </>
    );
}

export default Layout;
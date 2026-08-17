import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
    return (
        <main className="not-found">
            <div>
                <h1>404</h1>
                <h2>Recipe Not Found</h2>
                <p>The page you're looking for doesn't exist.</p>

                <Link to="/" className="home-button">
                    Back to Recipes
                </Link>
            </div>
        </main>
    );
}

export default NotFound;
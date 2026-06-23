import { Link } from "react-router-dom";
import './navbar.css';

export default function NavBar() {
  return (
    <div className="main-navbar">
      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/" className="nav_link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className="nav_link">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/help" className="nav_link">
              Help
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
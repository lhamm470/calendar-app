import { Link } from "react-router-dom";
import { useEffect } from "react";
import './navbar.css';

export default function NavBar() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

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
      <section>
        {currentUser ? 
          <div className="navbar-login-status">
            <span className="login-status-text">{currentUser.firstName} {currentUser.lastName}</span>
            <button className="navbar-authentication-button">Logout</button>
            <button className="navbar-authentication-button">Sign up</button>
          </div> :
          <div className="navbar-login-status">
            <span className="login-status-text">Currently logged out.</span>
            <button className="navbar-authentication-button">Login</button>
            <button className="navbar-authentication-button">Sign up</button>
          </div>
        }
      </section>
    </div>
  );
}
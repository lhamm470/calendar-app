import { Link } from "react-router-dom";
import { useEffect, useContext } from "react";
import { LoginStatusContext } from "../LoginStatusContext";
import './navbar.css';

export default function NavBar() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

  // Get loginstatus from LoginStatusContext
  const { loginStatus, setLoginStatus } = useContext(LoginStatusContext);

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
            <Link 
              to="/" 
              className="navbar-authentication-button" 
              onClick={() => {
                setLoginStatus("login");
                localStorage.setItem("currentUser", "null");
              }}
            >
              Logout
            </Link>
            <Link 
              to="/" 
              className="navbar-authentication-button" 
              onClick={() => {
                setLoginStatus("register");
                localStorage.setItem("currentUser", "null");
              }}
            >
              Sign up
            </Link>
          </div> :
          <div className="navbar-login-status">
            <Link 
              to="/" 
              className="navbar-authentication-button" 
              onClick={() => {
                setLoginStatus("login");
                localStorage.setItem("currentUser", "null");
              }}
            >
              Login
            </Link>
            <Link 
              to="/" 
              className="navbar-authentication-button" 
              onClick={() => {
                setLoginStatus("register");
                localStorage.setItem("currentUser", "null");
              }}
            >
              Sign up
            </Link>
          </div>
        }
      </section>
    </div>
  );
}
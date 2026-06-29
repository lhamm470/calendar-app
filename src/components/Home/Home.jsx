import NavBar from "../../routes/NavBar"; 
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../ThemeContext";
import { LoginStatusContext } from "../../LoginStatusContext";
import { useContext, useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import LoggedInCard from "./LoggedInCard";
import { FaSun, FaMoon } from "react-icons/fa";
import './home.css';

export default function Home() {
  const nav = useNavigate();

  // Get theme and setTheme from ThemeContext
  const { theme, setTheme } = useContext(ThemeContext);

  // Get loginstatus from LoginStatusContext
  const { loginStatus, setLoginStatus } = useContext(LoginStatusContext);

  const [registeredUsers, setRegisteredUsers] = useState(() => {
    return JSON.parse(localStorage.getItem("registeredUsers")) || {};
  })
  
  return (
    <div className="page">
      <NavBar />
      <main>
        <h1>Home</h1>
        
        {loginStatus == "loggedIn" ? <LoggedInCard /> : ""}
        {loginStatus == "login" ? <LoginForm registeredUsers={registeredUsers}/> : ""}
        {loginStatus == "register" ? <RegisterForm registeredUsers={registeredUsers} setRegisteredUsers={setRegisteredUsers}/> : ""}
        
        
        <div className="set-theme">
          <FaSun size={16}/>
          <label className="theme-switch">
            <input
              type="checkbox"
              checked={theme === "dark"}
              onChange={() => {
                setTheme(theme === "dark" ? "light" : "dark");
              }}
            />
            <span className="slider"></span>
          </label>
          <FaMoon size={16}/>
        </div>
      </main>
    </div>
  );
}
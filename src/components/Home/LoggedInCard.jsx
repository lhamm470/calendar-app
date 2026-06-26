import { LoginStatusContext } from "../../LoginStatusContext";
import { useContext, useState } from "react";
import './loggedincard.css'


export default function LoggedInCard() {
  // Get loginstatus
  const { loginStatus, setLoginStatus } = useContext(LoginStatusContext);

  localStorage.clear();
  
  return (
    <section className="logged-in-card">
      <h3 className="login-prompt">Welcome, {JSON.parse(localStorage.getItem("currentUser"))?.firstName}!</h3>
      <p>Navigate to your dashboard to view and manage upcoming events.</p>
      <button 
        className="authentication-button logout-button"
        onClick={() => {
          setLoginStatus("login");
          localStorage.setItem("currentUser", "null");
        }}
      >
        Logout
      </button>

      <button 
        className="register-instead" 
        onClick={() => {
          setLoginStatus("register");
          localStorage.setItem("currentUser", "null");
        }}
      >
        Register New User
      </button>

    </section>
  )
}
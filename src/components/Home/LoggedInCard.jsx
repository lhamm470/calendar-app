import { LoginStatusContext } from "../../LoginStatusContext";
import { useContext, useState } from "react";


export default function LoggedInCard() {
  // Get loginstatus
  const { loginStatus, setLoginStatus } = useContext(LoginStatusContext);
  
  return (
    <section className="login-card">
      <h5 className="login-prompt">Welcome, {JSON.parse(localStorage.getItem("currentUser"))?.firstName}!</h5>
      <button 
        className="authentication-button logout-button"
        onClick={() => {
          setLoginStatus("login");
          localStorage.setItem("currentUser", "");
        }}
      >
        Logout
      </button>

      <button 
        className="register-link" 
        onClick={() => setLoginStatus("register")}
      >
        Register new user
      </button>

    </section>
  )
}
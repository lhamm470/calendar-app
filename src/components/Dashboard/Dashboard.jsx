import { useContext } from "react";

// styling
import './dashboard.css';

// Components
import NavBar from "../../routes/NavBar";
import Calendar from "./Calendar";

import { ThemeContext } from "../../ThemeContext";


export default function Dashboard() {

  const { theme } = useContext(ThemeContext);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  
  return (
    <div className="page dashboard">
      <NavBar />
      <main>
        {currentUser ? 
          <Calendar /> :
          <span>Log in to view your dashboard content</span>
        }
      </main>
    </div>
  );
}
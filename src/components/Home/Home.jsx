import NavBar from "../../routes/NavBar"; 
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../ThemeContext";
import { useContext } from "react";

export default function Home() {
  const nav = useNavigate();

  // Get theme and setTheme from ThemeContext
  const { theme, setTheme } = useContext(ThemeContext);
  
  return (
    <div>
      <NavBar />
      <main>
        <h1>Welcome to the homepage!</h1>
        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          Toggle Theme
        </button>
      </main>
    </div>
  );
}
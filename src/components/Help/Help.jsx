import NavBar from "../../routes/NavBar";
import { ThemeContext } from "../../ThemeContext";
import { useContext } from "react";

export default function Help() {
  
  const { theme } = useContext(ThemeContext);
  
  
    return (
    <div>
      <NavBar />
      <h1>Help</h1>
    </div>
  );
}
import { useContext } from "react";

// styling
import './help.css';

// Components
import NavBar from "../../routes/NavBar";

import { ThemeContext } from "../../ThemeContext";


export default function Help() {

  const { theme } = useContext(ThemeContext);
  
  return (
    <div className="page help">
      <NavBar />
      <main>
        <div className="help-content">
          <h1 className="help-heading">Help</h1>
          <p>To use this calendar app, first register by navigating to the home page or clicking "sign up" in the top right corner and filling in the fields. Once you have registered and logged in, you will be able to view your events presented in a calendar in the dashboard tab.</p>
          <p>To add an event, click the "+ Add Event" button above the calendar and fill in the event details. Your events will be displayed in the calendar, which you can navigate using the month and year navigation tools above it. Clicking on an event in the calendar will bring up it's details, as well as options to edit details or remove the event.</p>
          <p>Tip: you can assign a colour to each event which you can use to represent the same type of event, such as appointments, meetings or classes. </p>
        </div>
      </main>
    </div>
  );
}
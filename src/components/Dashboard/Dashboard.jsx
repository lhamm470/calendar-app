import NavBar from "../../routes/NavBar";
import { useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../../ThemeContext";
import './dashboard.css';
import DayCard from "./DayCard";
import CalendarNavbar from "./CalendarNavbar";
import { SelectedDateContext } from "../../SelectedDateContext";
import AddEventForm from "./AddEventForm";

export default function Dashboard() {
  
  // Get selectedDate and setSelectedDate
  const { selectedDate, setSelectedDate } = useContext(SelectedDateContext);

  // Manage add event modal form
  const [showAddEventForm, setShowAddEventForm] = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayTime = today.getTime();
  
  const location = useLocation();
  const data = location.state;

  const { theme } = useContext(ThemeContext);

  const [dateArray, setDateArray] = useState([]);



  function renderMonth(newDate) {
    // Temporary dates array
    const dates = [];

    const newYear = newDate.getFullYear();
    const newMonth = newDate.getMonth();
    const newDaysInMonth = new Date(newYear, newMonth + 1, 0).getDate();
    const newDay = newDate.getDay();
    const newDaysInPreviousMonth = new Date(newYear, newMonth, 0).getDate();

    // Add previous month cells
    const newNumberOfPreviousMonthDates = (newDay + 6) % 7
    const newPreviousMonthStartingDate = newDaysInPreviousMonth - (newNumberOfPreviousMonthDates - 1);
    for (let i = newPreviousMonthStartingDate; i <= newDaysInPreviousMonth; i++) {
      dates.push(
        {
          date: new Date(newYear, newMonth - 1, i), 
          currentMonth: false
        }
      );
    }

    // Add selected month cells
    for (let i = 1; i <= newDaysInMonth; i++) {
      dates.push(
        {
          date: new Date(newYear, newMonth, i), 
          currentMonth: true
        }
      );
    }

    // Add next month cells
    const newNumberOfNextMonthDates = 7 - (dates.length % 7);
    for (let i = 1; i <= newNumberOfNextMonthDates; i++) {
      dates.push(
        {
          date: new Date(newYear, newMonth + 1, i), 
          currentMonth: false
        }
      );
    }

    setDateArray(dates);
  }

  useEffect(() => {
    renderMonth(selectedDate);
  }, [selectedDate])
  
  return (
    <div className="page">
      <NavBar />
      <main>
        <h1>Dashboard</h1>
        
        {/* Calendar navbar */}
        <CalendarNavbar setShowAddEventForm={setShowAddEventForm}/>

        {/* Days of the week */}
        <div className="calendar-days-of-week">
          <span className="day-of-week">Monday</span>
          <span className="day-of-week">Tuesday</span>
          <span className="day-of-week">Wednesday</span>
          <span className="day-of-week">Thursday</span>
          <span className="day-of-week">Friday</span>
          <span className="day-of-week">Saturday</span>
          <span className="day-of-week">Sunday</span>
        </div>

        {/* Calendar */}
        <section className="calendar">
          {dateArray.map((data, index) => 
            <DayCard 
              key={data.date} 
              date={data.date} 
              monthStatus={data.currentMonth ? "current-month" : "adjacent-month"}
              currentDateStatus={data.date.getTime() == todayTime ? "current-date" : ""}
            />
          )}
        </section>
        <AddEventForm show={showAddEventForm} onHide={() => setShowAddEventForm(false)} />
      </main>
    </div>
  );
}
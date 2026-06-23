import NavBar from "../../routes/NavBar";
import { useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../../ThemeContext";
import './dashboard.css';
import DayCard from "./DayCard";
import MonthDropdownButton from "./MonthDropdownButton";
import YearDropdownButton from "./YearDropdownButton";

export default function Dashboard() {
  const location = useLocation();
  const data = location.state;

  const { theme } = useContext(ThemeContext);

  // Get current date and set as selected date
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayTime = today.getTime();
  const [selectedDate, setSelectedDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const [dateArray, setDateArray] = useState([]);



  function renderMonth(newDate) {
    const dates = [];

    const newYear = newDate.getFullYear();
    const newMonth = newDate.getMonth();
    console.log(newMonth);
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
        <div className="calendar-navbar">

          {/* Change months */}
          <button 
            onClick={() => 
              setSelectedDate(
                new Date(
                  selectedDate.getFullYear(), 
                  selectedDate.getMonth() - 1, 
                  1
                )
              )
            }>
            {`<-`}
          </button>

          <MonthDropdownButton selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>

          <button 
            onClick={() => 
              setSelectedDate(
                new Date(
                  selectedDate.getFullYear(), 
                  selectedDate.getMonth() + 1, 
                  1
                )
              )
            }>
            {`->`}
          </button>

          {/* Change years */}
          <button 
            onClick={() => 
              setSelectedDate(
                new Date(
                  selectedDate.getFullYear() - 1, 
                  selectedDate.getMonth(), 
                  1
                )
              )
            }>
            {`<-`}
          </button>

          <YearDropdownButton selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>

          <button 
            onClick={() => 
              setSelectedDate(
                new Date(
                  selectedDate.getFullYear() + 1, 
                  selectedDate.getMonth(), 
                  1
                )
              )
            }>
            {`->`}
          </button>
        </div>

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
      </main>
    </div>
  );
}
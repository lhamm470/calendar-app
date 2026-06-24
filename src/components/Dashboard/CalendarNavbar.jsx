import './calendarnavbar.css';
import MonthDropdownButton from "./MonthDropdownButton";
import YearDropdownButton from "./YearDropdownButton";
import IncrementDateButton from './IncrementDateButton';
import { SelectedDateContext } from '../../SelectedDateContext';
import { useContext } from 'react';

export default function CalendarNavbar({ setShowAddEventForm }) {
  
  // Get selectedDate and setSelectedDate
  const { selectedDate, setSelectedDate } = useContext(SelectedDateContext);
  
  return (
    <div className="calendar-navbar">

      {/* Change months */}
      <IncrementDateButton incrementMonth={-1} />
      <MonthDropdownButton selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
      <IncrementDateButton incrementMonth={1} />

      {/* Change years */}
      <IncrementDateButton incrementYear={-1} />
      <YearDropdownButton selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
      <IncrementDateButton incrementYear={1} />

      <button onClick={() => setShowAddEventForm(true)}>
        + Add Event
      </button>
    </div>
  )
}
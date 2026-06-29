import './calendarnavbar.css';
import MonthDropdownButton from "./MonthDropdownButton";
import YearDropdownButton from "./YearDropdownButton";
import IncrementDateButton from './IncrementDateButton';
import { Button } from 'react-bootstrap';
import { SelectedDateContext } from '../../SelectedDateContext';
import { useContext } from 'react';

export default function CalendarNavbar({ setShowAddEventForm }) {
  
  // Get selectedDate and setSelectedDate
  const { selectedDate, setSelectedDate } = useContext(SelectedDateContext);
  
  return (
    <div className="calendar-navbar">

      {/* Change months */}
      <div className="month-selection">
        <IncrementDateButton incrementMonth={-1} />
        <MonthDropdownButton selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
        <IncrementDateButton incrementMonth={1} />
      </div>

      {/* Change years */}
      <div className="year-selection">
        <IncrementDateButton incrementYear={-1} />
        <YearDropdownButton selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
        <IncrementDateButton incrementYear={1} />
      </div>

      <Button onClick={() => setShowAddEventForm(true)} className="add-event-button">
        + Add Event
      </Button>
    </div>
  )
}
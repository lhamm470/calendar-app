import './daycard.css';
import EventCard from './EventCard';

export default function DayCard({ date, monthStatus, currentDateStatus }) {
  // Get current user id and registeredUsers array
  const currentUserId = JSON.parse(localStorage.getItem("currentUser")).userId;
  
  // Get current user's events array
  const events = JSON.parse(localStorage.getItem("registeredUsers"))[currentUserId].events;

  function isToday(event) {
    return new Date(event.date).getTime() == date.getTime();
  }

  let todaysEvents = events.filter(isToday);
  
  return (
    <div className={`day-card ${monthStatus}`}>
      <span className={`day-card-date ${currentDateStatus}`}>
        {date.getDate()}
      </span>
      {todaysEvents.map((event, index) => (
        <EventCard  key={index} title={event.title} time={event.startTime} />
      ))}
    </div>
  )
}
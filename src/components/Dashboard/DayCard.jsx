import './daycard.css';
import EventCard from './EventCard';

export default function DayCard({ date, monthStatus, currentDateStatus }) {
  return (
    <div className={`day-card ${monthStatus}`}>
      <span className={`day-card-date ${currentDateStatus}`}>
        {date.getDate()}
      </span>
      <EventCard />
    </div>
  )
}
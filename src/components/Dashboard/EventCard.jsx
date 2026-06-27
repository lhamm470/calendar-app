import './eventcard.css';

export default function EventCard({ title, startTime, endTime="", colour }) {
  return (
    <div className="event-card" style={{ backgroundColor: colour }}>
      <span className="event-card-time">{endTime ? `${startTime} - ${endTime}`: startTime}</span>
      <span className="event-card-title">{title}</span>
    </div>
  )
}
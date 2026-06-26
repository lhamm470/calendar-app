import './eventcard.css';

export default function EventCard({ title, time }) {
  return (
    <div className="event-card">
      <span className="event-card-time">{time}</span>
      <span className="event-card-title">{title}</span>
    </div>
  )
}
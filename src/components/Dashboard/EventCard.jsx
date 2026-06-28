import './eventcard.css';
import { useState } from 'react';
import DisplayEventDetails from './DisplayEventDetails';

export default function EventCard({ event }) {
  const [displayEventDetails, setDisplayEventDetails] = useState(false);
  
  return (
    <>
      <button className="event-card" onClick={() => setDisplayEventDetails(true)} style={{ backgroundColor: event.colour }}>
        <span className="event-card-time">{event.endTime ? `${event.startTime} - ${event.endTime}`: event.startTime}</span>
        <span className="event-card-title">{event.title}</span>
      </button>
      <DisplayEventDetails show={displayEventDetails} onHide={() => setDisplayEventDetails(false)} event={event}/>
    </>
  )
}
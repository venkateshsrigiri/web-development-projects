// src/components/EventCard.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function EventCard({ event }) {
  const dateStr = event.date?.seconds ? new Date(event.date.seconds * 1000).toLocaleString() : "";
  return (
    <div style={{ border: "1px solid #ddd", padding: 10, margin: 10 }}>
      <h3>{event.title}</h3>
      <p>{event.description}</p>
      <p>Date: {dateStr}</p>
      <p>Seats left: {event.seatsLeft ?? event.capacity ?? "—"}</p>
      <Link to={`/event/${event.id}`}>Details</Link>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const snap = await getDocs(collection(db, "events"));
        if (snap.empty) {
          // No events in Firestore → show sample events
          setEvents([
            {
              id: "sample1",
              title: "Tech Conference 2025",
              description: "A gathering of tech enthusiasts and industry leaders.",
              image: "https://source.unsplash.com/featured/?technology,conference",
            },
            {
              id: "sample2",
              title: "Music Fest",
              description: "An unforgettable night of live music and fun.",
              image: "https://source.unsplash.com/featured/?music,concert",
            },
            {
              id: "sample3",
              title: "Startup Meetup",
              description: "Pitch your startup idea and meet potential investors.",
              image: "https://source.unsplash.com/featured/?startup,meeting",
            },
          ]);
        } else {
          const arr = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
          setEvents(arr);
        }
      } catch (err) {
        console.error("Failed to load events:", err);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <section className="home">
      <h1 className="page-title">Upcoming Events</h1>

      {loading ? (
        <p>Loading events…</p>
      ) : events.length === 0 ? (
        <p>No events available.</p>
      ) : (
        <div className="events-grid">
          {events.map((ev) => (
            <article key={ev.id} className="card">
              {ev.image && <img src={ev.image} alt={ev.title} className="card-img" />}
              <div className="card-body">
                <h3 className="card-title">{ev.title}</h3>
                <p className="card-desc">{ev.description}</p>
                <Link to={`/event/${ev.id}`} className="btn-link">
                  View More
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

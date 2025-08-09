import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function EventPage({ user }) {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const docRef = doc(db, "events", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setEvent({ id: docSnap.id, ...data });
        } else {
          console.error("Event not found");
        }
      } catch (err) {
        console.error("Error fetching event:", err);
      }
    };
    fetchEvent();
  }, [id]);

  const handleRegister = async () => {
    if (!user) {
      alert("Please sign in to register.");
      return;
    }
    if (!event) {
      alert("Event data not loaded yet.");
      return;
    }

    try {
      await addDoc(collection(db, "registrations"), {
        uid: user.uid,
        eventId: event.id,
        eventTitle: event.title || "Untitled Event",
        registeredAt: serverTimestamp()
      });
      alert(`🎉 You have registered for ${event.title || "the event"}!`);
    } catch (err) {
      console.error("Error registering:", err);
      alert("Registration failed. Check console for details.");
    }
  };

  if (!event) return <p>Loading event...</p>;

  return (
    <div className="p-6 text-center">
      {event.image && (
        <img
          src={event.image}
          alt={event.title}
          className="mx-auto w-64 h-64 object-cover rounded-lg mb-6"
        />
      )}
      <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
      <p className="mb-6">{event.description}</p>
      <button
        onClick={handleRegister}
        className="border border-green-500 text-green-500 px-4 py-2 rounded hover:bg-green-500 hover:text-white transition"
      >
        Register
      </button>
    </div>
  );
}

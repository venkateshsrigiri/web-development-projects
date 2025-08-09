// src/utils/register.js
import { doc, collection, runTransaction, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export async function registerForEvent(eventId, eventTitle, user) {
  if (!user) {
    alert("Please sign in first");
    return;
  }
  const eventRef = doc(db, "events", eventId);
  const regRef = doc(collection(db, "registrations")); // new random doc id

  try {
    await runTransaction(db, async (tx) => {
      const ev = await tx.get(eventRef);
      if (!ev.exists()) throw new Error("Event not found");
      const seats = ev.data().seatsLeft ?? ev.data().capacity ?? 0;
      if (seats <= 0) throw new Error("No seats left");
      tx.update(eventRef, { seatsLeft: seats - 1 });
      tx.set(regRef, {
        eventId,
        eventTitle,
        userId: user.uid,
        userName: user.displayName || user.email,
        status: "registered",
        createdAt: serverTimestamp(),
      });
    });
    alert("Registered! Check your profile.");
  } catch (e) {
    alert("Registration failed: " + e.message);
  }
}

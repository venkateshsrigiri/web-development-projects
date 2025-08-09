// registers using transaction-safe approach when possible,
// adds a registrations document with a server timestamp.
import { doc, collection, runTransaction, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export async function registerForEvent(eventId, eventTitle, user) {
  if (!user) throw new Error("User not signed in.");

  const eventRef = doc(db, "events", eventId);
  const regRef = doc(collection(db, "registrations"));

  await runTransaction(db, async (tx) => {
    const evSnap = await tx.get(eventRef);
    if (!evSnap.exists()) throw new Error("Event not found");
    const data = evSnap.data();
    const seats = data.seatsLeft ?? data.capacity ?? Infinity;
    if (seats !== Infinity && seats <= 0) throw new Error("No seats left");
    if (seats !== Infinity) tx.update(eventRef, { seatsLeft: seats - 1 });
    tx.set(regRef, {
      uid: user.uid,
      userEmail: user.email,
      eventId,
      eventTitle,
      registeredAt: serverTimestamp(),
    });
  });
}

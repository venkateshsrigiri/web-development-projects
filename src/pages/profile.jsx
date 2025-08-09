import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";

export default function Profile({ user }) {
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    const fetchRegistrations = async () => {
      if (!user) return;
      const q = query(
        collection(db, "registrations"),
        where("uid", "==", user.uid),
        orderBy("registeredAt", "desc")
      );
      const snap = await getDocs(q);
      setRegistrations(
        snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    };
    fetchRegistrations();
  }, [user]);

  if (!user) {
    return <p className="p-6">Please sign in to view your profile.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <p>Email: {user.email}</p>

      <h2 className="text-xl mt-6 mb-2">My Registrations</h2>
      {registrations.length === 0 ? (
        <p>No events registered yet.</p>
      ) : (
        <ul className="list-disc list-inside">
          {registrations.map((reg) => (
            <li key={reg.id}>
              {reg.eventTitle} —{" "}
              {reg.registeredAt?.toDate().toLocaleString() || "Pending"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

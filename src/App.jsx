import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EventPage from "./pages/EventPage";
import Profile from "./pages/Profile";
import AuthForm from "./components/AuthForm";
import AppNavbar from "./Components/AppNavbar";
import { auth } from "./firebase"; // <-- create this file (see note)
import { onAuthStateChanged } from "firebase/auth";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return unsub;
  }, []);

  return (
    <div className="app-root">
      <AppNavbar user={user} />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/event/:id" element={<EventPage user={user} />} />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="/auth" element={<AuthForm />} />
        </Routes>
      </main>
    </div>
  );
}

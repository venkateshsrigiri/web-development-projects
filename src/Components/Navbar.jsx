// src/Components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function AppNavbar({ user, darkMode, setDarkMode }) {
  const baseBtn = `px-4 py-2 rounded border transition`;
  const darkStyle = "bg-black text-white border-gray-500 hover:bg-gray-700";
  const lightStyle = "bg-black text-white border-gray-500 hover:bg-gray-300";
  const btnStyle = darkMode ? `${baseBtn} ${darkStyle}` : `${baseBtn} ${lightStyle}`;

  return (
    <nav className={`flex items-center justify-center gap-4 p-4 border-b shadow-sm ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
      <Link to="/" className={btnStyle}>EventConnect</Link>

      <Link to="/" className={btnStyle}>Home</Link>

      {user ? (
        <Link to="/profile" className={btnStyle}>Profile</Link>
      ) : (
        <Link to="/auth" className={btnStyle}>Sign in</Link>
      )}

      {user && <button onClick={() => signOut(auth)} className={btnStyle}>Sign out</button>}

      <button onClick={() => alert("This project is from Codegnan Institute")} className={btnStyle}>Codegnan Info</button>

      <button onClick={() => setDarkMode(!darkMode)} className={btnStyle}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </nav>
  );
}

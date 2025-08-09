import React from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function AppNavbar({ user }) {
  return (
    <nav className="nav">
      <div className="nav-left">
        <Link to="/" className="brand">EventConnect</Link>
      </div>

      <div className="nav-right">
        <Link to="/" className="nav-btn">Home</Link>

        {user ? (
          <Link to="/profile" className="nav-btn">Profile</Link>
        ) : (
          <Link to="/auth" className="nav-btn">Sign in</Link>
        )}

        {user && (
          <button
            onClick={() => signOut(auth)}
            className="nav-btn nav-btn-outline"
            title="Sign out"
          >
            Sign out
          </button>
        )}
      </div>
    </nav>
  );
}

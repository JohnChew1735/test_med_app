// src/Components/Navbar/Navbar.js
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [user, setUser] = useState(null); // will hold display name
  const navigate = useNavigate();

  useEffect(() => {
    const email = sessionStorage.getItem("email");
    const name = sessionStorage.getItem("name");
    if (email || name) {
      // prefer stored name; otherwise take part before @ from email
      const display = name || (email ? email.split("@")[0] : null);
      setUser(display);
    } else {
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    // remove auth info and update UI
    sessionStorage.removeItem("auth-token");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("phone");
    setUser(null);
    navigate("/");
    window.location.reload()
  };

  return (
    <nav className="navbar">
      <div className="logo"><Link to="/">MediCare</Link></div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/appointments">Appointments</Link>
        <Link to="/review">Reviews</Link>

        {user ? (
          <>
            <span className="nav-username" style={{ marginLeft: "1rem" }}>
            Hi, {user}
            </span>
            <button className="btn-logout" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/signup" className="btn-outline">Sign Up</Link>
            <Link to="/login" className="btn-outline">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

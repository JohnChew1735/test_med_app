import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">MediCare</div>
      <div className="nav-links">
        <a href="/">Home</a>
        <a href="/appointments">Appointments</a>
        <a href="/signup">Sign Up</a>
        <a href="/login">Login</a>
      </div>
    </nav>
  );
};

export default Navbar;

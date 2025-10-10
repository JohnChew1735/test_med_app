// src/Components/Navbar/Navbar.js
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfileCard from "../ProfileCard/ProfileCard";
import "./Navbar.css";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("email");
    const storedName = sessionStorage.getItem("name");
    if (storedEmail || storedName) {
      const displayName = storedName || (storedEmail ? storedEmail.split("@")[0] : "User");
      setUser(displayName);
      setEmail(storedEmail);
    } else {
      setUser(null);
      setEmail("");
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("auth-token");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("phone");
    setUser(null);
    navigate("/");
    window.location.reload();
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const goToProfile = () => {
    setShowDropdown(false); // close dropdown
    navigate("/profile");   // navigate to profile page
  };

    const goToReports = () => {
        setShowDropdown(false); // close dropdown
        navigate("/report");   // navigate to profile page
    };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">MediCare</Link>
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/appointments">Appointments</Link>
        <Link to="/review">Reviews</Link>

        {user ? (
          <div className="profile-dropdown">
            <button className="profile-btn" onClick={toggleDropdown}>
              Hi, {user} ▼
            </button>

            {showDropdown && (
              <div className="dropdown-content">
                {/* Make ProfileCard clickable */}
                <div onClick={goToProfile} style={{ cursor: "pointer" }}>
                  <ProfileCard/>
                </div>
                <div onClick={goToReports} style={{ cursor: "pointer" }}>
                  <p className="reports_Layout">My Reports</p>
                </div>

                <button className="btn-logout" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/signup" className="btn-outline">
              Sign Up
            </Link>
            <Link to="/login" className="btn-outline">
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

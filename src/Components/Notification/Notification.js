import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./Notification.css";

const Notification = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [showNotification, setShowNotification] = useState(true);

  useEffect(() => {
    const storedUsername = sessionStorage.getItem("email");
    const storedAppointments =
      JSON.parse(localStorage.getItem("appointments")) || [];

    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }

    setAppointments(storedAppointments);
  }, []);

  const handleCancel = (id) => {
    const updatedAppointments = appointments.filter((appt) => appt.id !== id);
    localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
    setAppointments(updatedAppointments);
  };

  return (
    <div>
      <Navbar />
      {children}

      {isLoggedIn && appointments.length > 0 && showNotification && (
        <div className="notification-container">
          {appointments.map((appt) => (
            <div key={appt.id} className="appointment-card">
              <div className="appointment-card__content">
                <h3 className="appointment-card__title">Appointment Details</h3>
                <p><strong>Patient:</strong> {appt.patientName}</p>
                <p><strong>Phone:</strong> {appt.phoneNumber}</p>
                <p><strong>Doctor:</strong> {appt.doctor?.name}</p>
                <p><strong>Speciality:</strong> {appt.doctor?.speciality}</p>
                <p><strong>Date:</strong> {appt.date}</p>
                <p><strong>Time:</strong> {appt.time}</p>
                <button
                  className="cancel-btn"
                  onClick={() => handleCancel(appt.id)}
                >
                  Cancel Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notification;

import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./Notification.css";

const Notification = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [doctorData, setDoctorData] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);
  const [showNotification, setShowNotification] = useState(true);

  useEffect(() => {
    const storedUsername = sessionStorage.getItem("email");
    const storedDoctorData = JSON.parse(localStorage.getItem("doctorData"));
    const storedAppointmentData = JSON.parse(localStorage.getItem("appointmentData"));

    console.log("Stored Username:", storedUsername);
    console.log("Stored Doctor Data:", storedDoctorData);
    console.log("Stored Appointment Data:", storedAppointmentData);

    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }

    if (storedDoctorData) {
      setDoctorData(storedDoctorData);
    }

    if (storedAppointmentData) {
      setAppointmentData(storedAppointmentData);
    }
  }, []);

  const handleCancel = () => {
    localStorage.removeItem("appointmentData");
    setShowNotification(false);
  };

  return (
    <div>
      <Navbar />
      {children}

      {isLoggedIn && appointmentData && showNotification && (
        <div className="notification-container">
          <div className="appointment-card">
            <div className="appointment-card__content">
              <h3 className="appointment-card__title">Appointment Details</h3>
              <p><strong>Patient:</strong> {appointmentData?.patientName}</p>
              <p><strong>Phone:</strong> {appointmentData?.phoneNumber}</p>
              <p><strong>Doctor:</strong> {doctorData?.name}</p>
              <p><strong>Speciality:</strong> {doctorData?.speciality}</p>
              <p><strong>Date:</strong> {appointmentData?.date}</p>
              <p><strong>Time:</strong> {appointmentData?.time}</p>
              <button className="cancel-btn" onClick={handleCancel}>Cancel Appointment</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;

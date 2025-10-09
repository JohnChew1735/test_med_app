import React, { useState } from "react";
import "./AppointmentForm.css";

const AppointmentForm = ({ doctorName, doctorSpeciality, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    date: "",
    time: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
    setSuccess(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, phoneNumber, date, time } = formData;

    if (!name || !phoneNumber || !date || !time) {
      setError("⚠️ Please fill out all fields before submitting.");
      return;
    }

    if (phoneNumber.length < 8) {
      setError("⚠️ Phone number must be at least 8 digits.");
      return;
    }

    // Simulate form submission
    onSubmit?.(formData);
    setSuccess(true);
    setError("");
    setFormData({
      name: "",
      phoneNumber: "",
      date: "",
      time: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="appointment-form">
      <h2>Book Appointment</h2>
      {doctorName && (
        <p className="doctor-info">
          Booking with <strong>{doctorName}</strong> ({doctorSpeciality})
        </p>
      )}

      <div className="form-group">
        <label htmlFor="name">Full Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="e.g. 0123456789"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="date">Select Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          min={new Date().toISOString().split("T")[0]}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="time">Select Time Slot:</label>
        <input
          type="time"
          id="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />
      </div>

      {error && <p className="error-text">{error}</p>}
      {success && <p className="success-text">✅ Appointment booked successfully!</p>}

      <button type="submit" className="book-btn">
        Confirm Booking
      </button>
    </form>
  );
};

export default AppointmentForm;

// src/Components/DoctorCard/DoctorCard.js
import React, { useState } from "react";
import "./DoctorCard.css";
import AppointmentForm from "../AppointmentForm/AppointmentForm";

const DoctorCard = ({ name, speciality, experience, ratings, image }) => {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleBookingClick = () => {
    setShowForm(true);
    setSubmitted(false);
  };

  const handleFormSubmit = (formData) => {
    console.log("Appointment Data:", {
      ...formData,
      doctorName: name,
      doctorSpeciality: speciality,
    });
    setSubmitted(true);
    setShowForm(false); // close form after submission
  };

  return (
    <div className="doctor-card-container">
      <div className="doctor-card-profile-image-container">
        <img src={image} alt={name} />
      </div>

      <div className="doctor-card-details-container">
        <div className="doctor-card-detail-name">{name}</div>
        <div className="doctor-card-detail-speciality">{speciality}</div>
        <div className="doctor-card-detail-experience">
          Experience: {experience} years
        </div>
        <div className="doctor-card-detail-consultationfees">
          Ratings: ⭐ {ratings}
        </div>

        <div>
          <button
            className="book-appointment-btn"
            onClick={handleBookingClick}
          >
            <div>Book Appointment</div>
            <div>No Booking Fee</div>
          </button>
        </div>

        {/* ✅ Conditionally render form */}
        {showForm && (
        <div className="appointment-form-modal">
            <AppointmentForm
            doctorName={name}
            doctorSpeciality={speciality}
            onSubmit={handleFormSubmit}
            onCancel={() => setShowForm(false)}
            />
        </div>
        )}


        {/* ✅ Success message after form submission */}
        {submitted && (
          <p className="success-text">✅ Appointment booked successfully!</p>
        )}
      </div>
    </div>
  );
};

export default DoctorCard;

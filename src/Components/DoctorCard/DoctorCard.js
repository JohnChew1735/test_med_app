import React, { useState } from "react";
import "./DoctorCard.css";
import AppointmentForm from "../AppointmentForm/AppointmentForm";

const DoctorCard = ({ name, speciality, experience, ratings, image }) => {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [appointmentData, setAppointmentData] = useState(null); // Track booked appointment

  const handleBookingClick = () => {
    setShowForm(true);
    setSubmitted(false);
  };

  const handleFormSubmit = (formData) => {
    setAppointmentData({ ...formData, doctorName: name, doctorSpeciality: speciality });
    setSubmitted(true);
    setShowForm(false);
  };

  const handleCancelAppointment = () => {
    setAppointmentData(null);
    setSubmitted(false);
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

        {/* Book Appointment button */}
        {!appointmentData && (
          <button className="book-appointment-btn" onClick={handleBookingClick}>
            <div>Book Appointment</div>
            <div>No Booking Fee</div>
          </button>
        )}

        {/* Appointment Form Modal */}
        {showForm && (
          <div
            className="appointment-form-modal"
            onClick={() => setShowForm(false)}
          >
            <div onClick={(e) => e.stopPropagation()}>
              <AppointmentForm
                doctorName={name}
                doctorSpeciality={speciality}
                onSubmit={handleFormSubmit}
                onCancel={() => setShowForm(false)}
              />
            </div>
          </div>
        )}

        {/* Success message + Cancel button */}
        {submitted && appointmentData && (
          <div>
            <p className="success-text"> Appointment booked</p>
            <button
              className="cancel-appointment-btn"
              onClick={handleCancelAppointment}
              style={{
                marginTop: "10px",
                backgroundColor: "#dc3545",
                color: "white",
                padding: "10px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Cancel Appointment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorCard;

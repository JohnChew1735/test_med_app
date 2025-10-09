// src/Components/DoctorCard/DoctorCard.js
import React from "react";
import "./DoctorCard.css";

const DoctorCard = ({ name, speciality, experience, ratings, image }) => {
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

        {/* Step 6: Add the booking button */}
        <div>
          <button className="book-appointment-btn">
            <div>Book Appointment</div>
            <div>No Booking Fee</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;

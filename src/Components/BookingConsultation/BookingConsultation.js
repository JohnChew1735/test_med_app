import React, { useState, useEffect } from "react";
import DoctorCard from "../DoctorCard/DoctorCard";
import FindDoctorSearch from "../FindDoctorSearch/FindDoctorSearch";

const BookingConsultation = () => {
  const [searchTerm, setSearchTerm] = useState(""); 
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  // Fetch doctor data from API
  const getDoctorsDetails = async () => {
    try {
      const res = await fetch("https://api.npoint.io/9a5543d36f1460da2f63"); // replace with your API endpoint
      const data = await res.json();
      setDoctors(data);
      setFilteredDoctors(data); // show all initially
    } catch (err) {
      console.error("Error fetching doctors:", err);
    }
  };

  useEffect(() => {
    getDoctorsDetails();
  }, []);

  // Filter doctors by search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredDoctors(doctors); // show all if search is empty
    } else {
      const filtered = doctors.filter(
        (doctor) =>
          doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doctor.speciality.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredDoctors(filtered);
    }
  }, [searchTerm, doctors]);

  return (
    <div className="booking-consultation-container">
      <h1>Book a Consultation</h1>

      {/* Doctor search */}
      <FindDoctorSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Display doctor cards */}
      <div className="doctor-cards-container">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              name={doctor.name}
              speciality={doctor.speciality}
              experience={doctor.experience}
              ratings={doctor.ratings}
              image={doctor.image}
            />
          ))
        ) : (
          <p>No doctors found.</p>
        )}
      </div>
    </div>
  );
};

export default BookingConsultation;

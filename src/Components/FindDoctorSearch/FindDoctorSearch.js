import React, { useState } from "react";
import "./FindDoctorSearch.css";

const SPECIALITIES = [
  "Dentist",
  "Gynecologist/Obstetrician",
  "General Physician",
  "Dermatologist",
  "Ear-Nose-Throat (ENT) Specialist",
  "Homeopath",
  "Ayurveda",
];

const FindDoctorSearch = ({ searchTerm, setSearchTerm }) => {
  const [showResults, setShowResults] = useState(false);

  // only navigate when the user clicks/selects from the list
  const handleSelect = (speciality) => {
    setSearchTerm(speciality);
    setShowResults(false);
    // optionally, you can trigger a function here to filter locally instead of navigating
    // if you want routing, call navigate manually on a button click outside this component
  };

  const filteredSpecialities = SPECIALITIES.filter((s) =>
    s.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="find-doctor-page">
      <center>
        <h1 className="find-doctor-title">Find a doctor and consult instantly</h1>
        <div className="icon-container">
          <i className="fa fa-user-md doctor-icon" aria-hidden="true"></i>
        </div>

        <div className="search-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search doctors, clinics, hospitals, etc."
              className="search-input"
              value={searchTerm}
              onFocus={() => setShowResults(true)}
              onBlur={() => setTimeout(() => setShowResults(false), 150)}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="search-icon-box">
              <img
                src={process.env.PUBLIC_URL + "/images/search.svg"}
                alt="Search Icon"
                className="search-icon"
              />
            </div>

            {showResults && (
              <div className="results-dropdown">
                {filteredSpecialities.length > 0 ? (
                  filteredSpecialities.map((speciality) => (
                    <div
                      className="result-item"
                      key={speciality}
                      onMouseDown={() => handleSelect(speciality)} // only navigate here if desired
                    >
                      <span className="result-icon">
                        <img
                          src={process.env.PUBLIC_URL + "/images/search.svg"}
                          alt=""
                          width="12"
                          height="12"
                        />
                      </span>
                      <span className="result-name">{speciality}</span>
                      <span className="result-type">Speciality</span>
                    </div>
                  ))
                ) : (
                  <div className="no-results">No matching results</div>
                )}
              </div>
            )}
          </div>
        </div>
      </center>
    </div>
  );
};

export default FindDoctorSearch;

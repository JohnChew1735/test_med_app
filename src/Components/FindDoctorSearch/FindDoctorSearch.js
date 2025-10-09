import React, { useState } from "react";
import "./FindDoctorSearch.css";
import { useNavigate } from "react-router-dom";

const SPECIALITIES = [
  "Dentist",
  "Gynecologist/Obstetrician",
  "General Physician",
  "Dermatologist",
  "Ear-Nose-Throat (ENT) Specialist",
  "Homeopath",
  "Ayurveda",
];

const FindDoctorSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const handleSelect = (speciality) => {
    setSearchQuery(speciality);
    setShowResults(false);
    navigate(`/instant-consultation?speciality=${encodeURIComponent(speciality)}`);
  };

  const filteredSpecialities = SPECIALITIES.filter((s) =>
    s.toLowerCase().includes(searchQuery.toLowerCase())
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
              value={searchQuery}
              onFocus={() => setShowResults(true)}
              onBlur={() => setTimeout(() => setShowResults(false), 150)}
              onChange={(e) => setSearchQuery(e.target.value)}
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
                      onMouseDown={() => handleSelect(speciality)}
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

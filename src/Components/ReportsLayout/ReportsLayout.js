import React, { useEffect, useState } from "react";
import "./ReportsLayout.css";

function ReportsLayout() {
  const [doctors, setDoctors] = useState([]);

  // Fetch doctors data from API
  const getDoctorsDetails = async () => {
    try {
      const res = await fetch("https://api.npoint.io/9a5543d36f1460da2f63");
      const data = await res.json();
      setDoctors(data);
    } catch (err) {
      console.error("Error fetching doctors:", err);
    }
  };

  useEffect(() => {
    getDoctorsDetails();
  }, []);

  const handleViewReport = (doctorName) => {
    alert(`Viewing report for ${doctorName}`);
  };

  const handleDownloadReport = (doctorName) => {
    alert(`Downloading report for ${doctorName}`);
  };

  return (
    <div className="reports-layout">
      <h2>Your Reports</h2>
      <table className="reports-table">
        <thead>
          <tr>
            <th>Serial No.</th>
            <th>Doctor Name</th>
            <th>Speciality</th>
            <th>View Report</th>
            <th>Download Report</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor, index) => (
            <tr key={doctor.id || index}>
              <td>{index + 1}</td>
              <td>{doctor.name}</td>
              <td>{doctor.speciality}</td>
              <td>
                <button
                  className="btn-view"
                  onClick={() => handleViewReport(doctor.name)}
                >
                  View
                </button>
              </td>
              <td>
                <button
                  className="btn-download"
                  onClick={() => handleDownloadReport(doctor.name)}
                >
                  Download
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReportsLayout;

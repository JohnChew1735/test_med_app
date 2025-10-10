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

  // File path (in public folder)
  const reportPath = "/patient_report.pdf";

  const handleViewReport = () => {
    // Open the report in a new tab
    window.open(reportPath, "_blank");
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
                <button className="btn-view" onClick={handleViewReport}>
                  View
                </button>
              </td>
              <td>
                <a href={reportPath} download={`Report_${doctor.name}.pdf`}>
                  <button className="btn-download">Download</button>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReportsLayout;

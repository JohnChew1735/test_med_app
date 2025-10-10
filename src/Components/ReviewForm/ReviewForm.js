import React, { useState, useEffect } from "react";
import "./ReviewForm.css";

const ReviewForm = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [formData, setFormData] = useState({ name: "", review: "", rating: "" });
  const [submittedReviews, setSubmittedReviews] = useState({});

  // Fetch doctor data
  useEffect(() => {
    const getDoctorsDetails = async () => {
      try {
        const res = await fetch("https://api.npoint.io/9a5543d36f1460da2f63");
        const data = await res.json();
        setDoctors(data);
      } catch (err) {
        console.error("Error fetching doctors:", err);
      }
    };
    getDoctorsDetails();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submit
    const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.review || !formData.rating) {
        alert("⚠️ Please fill in all fields.");
        return;
    }

    setSubmittedReviews((prev) => ({
    ...prev,
    [selectedDoctor.key]: { ...formData },
    }));


    setFormData({ name: "", review: "", rating: "" });
    setSelectedDoctor(null);
    };


  // Close modal when clicking outside
  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      setSelectedDoctor(null);
    }
  };

  return (
    <div className="review-table-container">
      <h2>Doctor Reviews</h2>
      <table className="review-table">
        <thead>
          <tr>
            <th>Serial No.</th>
            <th>Doctor Name</th>
            <th>Speciality</th>
            <th>Provide Feedback</th>
            <th>Review Given</th>
          </tr>
        </thead>
        <tbody>
        {doctors.map((doctor, index) => {
            const doctorKey = doctor.id || index; // ✅ ensure unique key
            return (
            <tr key={doctorKey}>
                <td>{index + 1}</td>
                <td>{doctor.name}</td>
                <td>{doctor.speciality}</td>
                <td>
                <button
                    onClick={() => setSelectedDoctor({ ...doctor, key: doctorKey })}
                    disabled={submittedReviews[doctorKey]}
                    className="feedback-btn"
                >
                    {submittedReviews[doctorKey]
                    ? "Feedback Submitted"
                    : "Click Here"}
                </button>
                </td>
                <td>
                {submittedReviews[doctorKey] ? (
                    <>
                    <strong>{submittedReviews[doctorKey].name}</strong>:{" "}
                    {submittedReviews[doctorKey].review} ⭐
                    {submittedReviews[doctorKey].rating}
                    </>
                ) : (
                    "-"
                )}
                </td>
            </tr>
            );
        })}
        </tbody>
      </table>

      {/* Modal popup for feedback */}
      {selectedDoctor && (
        <div className="modal-overlay" onClick={handleOutsideClick}>
          <div className="modal-content">
            <h3>Leave Feedback for {selectedDoctor.name}</h3>
            <form onSubmit={handleSubmit}>
              <label>
                Your Name:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Your Review:
                <textarea
                  name="review"
                  value={formData.review}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Rating (1–5):
                <select
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </label>

              <div className="form-buttons">
                <button type="submit">Submit</button>
                <button
                  type="button"
                  onClick={() => setSelectedDoctor(null)}
                  className="cancel-btn"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewForm;

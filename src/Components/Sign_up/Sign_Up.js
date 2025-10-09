import React, { useState } from "react";
import "./Sign_Up.css";

const Sign_Up = () => {
  // --- State to store form values ---
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  // --- State to store validation errors ---
  const [errors, setErrors] = useState({});

  // --- Handle input change ---
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // clear error while typing
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  // --- Validation rules ---
  const validate = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Phone must be exactly 10 digits
    if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    // Email must be valid format
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    // Password minimum 6 characters
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    return newErrors;
  };

  // --- Handle form submission ---
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      alert("Sign Up Successful!");
      console.log("Form Data Submitted:", formData);
      // You could send this to backend API here
    }
  };

  // --- Handle reset ---
  const handleReset = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      password: "",
    });
    setErrors({});
  };

  return (
    <div className="container" style={{ marginTop: "5%" }}>
      <div className="signup-grid">
        <div className="signup-text">
          <h1>Sign Up</h1>
        </div>

        <div className="signup-text1" style={{ textAlign: "left" }}>
          Already a member?{" "}
          <span>
            <a href="/login" style={{ color: "#2190FF" }}>
              Login
            </a>
          </span>
        </div>

        <div className="signup-form">
          <form onSubmit={handleSubmit} onReset={handleReset}>
            {/* Name Field */}
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                required
                className="form-control"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
            </div>

            {/* Phone Field */}
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                required
                className="form-control"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}
            </div>

            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="form-control"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                required
                className="form-control"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <p style={{ color: "red" }}>{errors.password}</p>
              )}
            </div>

            {/* Buttons */}
            <div className="btn-group">
              <button type="submit" className="btn btn-primary mb-2 mr-1">
                Submit
              </button>
              <button type="reset" className="btn btn-danger mb-2">
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Sign_Up;

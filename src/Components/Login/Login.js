import React, { useState } from "react";
import "./Login.css";

const Login = () => {
  // State variables for input values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // State variables for validation messages
  const [errors, setErrors] = useState({});

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Login successful!");
      // Here you can add login API call later
    }
  };

  // Reset handler
  const handleReset = () => {
    setEmail("");
    setPassword("");
    setErrors({});
  };

  return (
    <div className="container">
      <div className="login-grid">
        <div className="login-text">
          <h2>Login</h2>
        </div>

        <div className="login-text">
          Are you a new member?{" "}
          <span>
            <a href="/signup" style={{ color: "#2190FF" }}>
              Sign Up Here
            </a>
          </span>
        </div>

        <br />

        <div className="login-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <p style={{ color: "red", fontSize: "14px" }}>{errors.email}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <p style={{ color: "red", fontSize: "14px" }}>
                  {errors.password}
                </p>
              )}
            </div>

            <div className="btn-group">
              <button
                type="submit"
                className="btn btn-primary mb-2 mr-1 waves-effect waves-light"
              >
                Login
              </button>
              <button
                type="button"
                className="btn btn-danger mb-2 waves-effect waves-light"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>

            <div className="login-text">Forgot Password?</div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../config";
import "./Sign_Up.css";

const Sign_Up = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const validate = () => {
    if (!name.trim()) return "Name is required";
    if (!/^\d{10}$/.test(phone)) return "Phone must be exactly 10 digits";
    if (!/\S+@\S+\.\S+/.test(email)) return "Invalid email address";
    if (password.length < 6) return "Password must be at least 6 characters";
    return null;
  };

  const register = async (e) => {
    e.preventDefault();
    setErr("");
    const v = validate();
    if (v) {
      setErr(v);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, phone }),
      });
      const json = await response.json();

      if (json.authtoken) {
        sessionStorage.setItem("auth-token", json.authtoken);
        sessionStorage.setItem("name", name);
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("phone", phone);

        navigate("/");
        window.location.reload();
      } else {
        // show server validation errors in friendly way
        if (json.errors) setErr(json.errors.map((e) => e.msg).join(", "));
        else setErr(json.error || "Registration failed");
      }
    } catch (error) {
      setErr("Unable to contact server. Try again later.");
      console.error(error);
    }
  };

  return (
    <div className="container" style={{ marginTop: "5%" }}>
      <div className="signup-grid">
        <div className="signup-text"><h1>Sign Up</h1></div>
        <div className="signup-text1" style={{ textAlign: "left" }}>
          Already a member? <Link to="/login" style={{ color: "#2190FF" }}>Login</Link>
        </div>

        <div className="signup-form">
          <form onSubmit={register}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input id="name" className="form-control" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name"/>
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input id="phone" className="form-control" required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter your phone number"/>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" className="form-control" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email"/>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" className="form-control" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password"/>
            </div>

            {err && <div className="err" style={{ color: "red", marginBottom: 10 }}>{err}</div>}

            <div className="btn-group">
              <button type="submit" className="btn btn-primary">Submit</button>
              <button type="reset" className="btn btn-danger" onClick={() => { setName(""); setPhone(""); setEmail(""); setPassword(""); setErr(""); }}>Reset</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Sign_Up;

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_URL } from "../../config";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErr("");
    if (!email || !password) {
      setErr("Please enter both email and password");
      return;
    }
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const json = await res.json();

      if (json.authtoken) {
        sessionStorage.setItem("auth-token", json.authtoken);
        sessionStorage.setItem("email", email);
        // optionally store name if returned by backend
        if (json.name) sessionStorage.setItem("name", json.name);
        navigate("/");
        window.location.reload();
      } else {
        setErr(json.error || "Login failed");
      }
    } catch (error) {
      setErr("Unable to contact server.");
      console.error(error);
    }
  };

  return (
    <div className="container" style={{ marginTop: "5%" }}>
      <div className="login-grid">
        <div className="login-text"><h2>Login</h2></div>
        <div className="login-text">New? <Link to="/signup">Sign Up Here</Link></div>

        <div className="login-form">
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email</label>
              <input className="form-control" type="email" value={email} onChange={e => setEmail(e.target.value)} required/>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input className="form-control" type="password" value={password} onChange={e => setPassword(e.target.value)} required/>
            </div>

            {err && <div style={{ color: "red" }}>{err}</div>}

            <div className="btn-group">
              <button type="submit" className="btn btn-primary">Login</button>
              <button type="reset" className="btn btn-danger" onClick={() => { setEmail(""); setPassword(""); setErr(""); }}>Reset</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

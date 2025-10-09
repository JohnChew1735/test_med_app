import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import LandingPage from "./Components/Landing_Page/LandingPage";
import SignUp from "./Components/Sign_up/Sign_Up";
import Login from "./Components/Login/Login";
import InstantConsultation from "./Components/Instant_Consultation/InstantConsultation";
import BookingConsultation from "./Components/BookingConsultation/BookingConsultation"; // ✅ import new component
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/instant-consultation" element={<InstantConsultation />} />

        {/* ✅ Add BookingConsultation route */}
        <Route path="/booking-consultation" element={<BookingConsultation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

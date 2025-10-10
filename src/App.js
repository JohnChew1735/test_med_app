import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./Components/Landing_Page/LandingPage";
import SignUp from "./Components/Sign_up/Sign_Up";
import Login from "./Components/Login/Login";
import InstantConsultation from "./Components/Instant_Consultation/InstantConsultation";
import BookingConsultation from "./Components/BookingConsultation/BookingConsultation";
import Notification from "./Components/Notification/Notification";
import ReviewForm from "./Components/ReviewForm/ReviewForm";
import ProfileForm from "./Components/ProfileForm/ProfileForm";
import ReportsLayout from "./Components/ReportsLayout/ReportsLayout";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Notification>
        <p style={{ textAlign: "center", marginTop: "20px" }}>
        </p>
      </Notification>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/instant-consultation" element={<InstantConsultation />} />
        <Route path="/booking-consultation" element={<BookingConsultation />} />
        <Route path="/review" element={<ReviewForm />} />
        <Route path="/profile" element={<ProfileForm />} />
        <Route path="/report" element={<ReportsLayout />} />
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;

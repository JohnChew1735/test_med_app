import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import LandingPage from "./Components/Landing_Page/LandingPage";
import SignUp from "./Components/Sign_up/Sign_Up";
import Login from "./Components/Login/Login";
import InstantConsultation from "./Components/Instant_Consultation/InstantConsultation";
import FindDoctorSearch from "./Components/FindDoctorSearch/FindDoctorSearch";
import DoctorCard from "./Components/DoctorCard/DoctorCard";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/instant-consultation" element={<InstantConsultation />} />
      </Routes>
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <FindDoctorSearch/>
        <DoctorCard
          name="Dr. Aisha Tan"
          speciality="Dermatologist"
          experience="10"
          ratings="4.9"
          image="https://img.freepik.com/free-vector/hand-drawn-doctor-cartoon-illustration_23-2150680327.jpg?semt=ais_hybrid&w=740&q=80"
        />
        <DoctorCard
            name="Dr. Nurul Izzah Ahmad"
            speciality="Cardiologist"
            experience="12"
            ratings="4.8"
            image="https://img.freepik.com/free-vector/hand-drawn-doctor-cartoon-illustration_23-2150696179.jpg"
        />
        <DoctorCard
            name="Dr. Daniel Ong"
            speciality="Orthopedic Surgeon"
            experience="15"
            ratings="4.7"
            image="https://png.pngtree.com/png-clipart/20190618/original/pngtree-black-man-black-doctor-doctors-white-coat-png-image_3921468.jpg"
        />
        <DoctorCard
            name="Dr. Kavitha Raj"
            speciality="Gynecologist"
            experience="9"
            ratings="4.9"
            image="https://static.vecteezy.com/system/resources/previews/027/187/680/non_2x/cartoon-3d-doctor-rendering-free-png.png"
        />
        <DoctorCard
            name="Dr. Rajesh Kumar"
            speciality="Neurologist"
            experience="14"
            ratings="4.6"
            image="https://www.shutterstock.com/image-vector/3d-doctor-medical-consultation-avatar-600nw-2261118655.jpg"
        />
      </div>
    </BrowserRouter>
  );
}

export default App;

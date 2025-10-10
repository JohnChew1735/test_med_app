import React from "react";
import "./ProfileCard.css";

const ProfileCard = ({ name, email, image, role }) => {
  return (
    <div className="profile-card">
      <img src={image} alt={name} className="profile-card__image" />
      <h2 className="profile-card__name">{name}</h2>
      <p className="profile-card__email">{email}</p>
      <p className="profile-card__role">{role}</p>
    </div>
  );
};

export default ProfileCard;

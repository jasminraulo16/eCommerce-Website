import React from "react";
import "./ProfileCard.css";

const ProfileCard = ({userInfo}) => {
  return (
    <div className="profile-card">
      <img src="https://i0.wp.com/picjumbo.com/wp-content/uploads/silhouette-of-young-blonde-with-short-hair-on-orange-background-free-image.jpeg?h=800&quality=80" alt="Profile" className="profile-pic" />
      <p className="email">{userInfo.email}</p>
      <button className="edit-button">Edit Profile</button>
    </div>
  );
};

export default ProfileCard;

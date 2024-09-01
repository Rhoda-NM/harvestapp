import React from "react";
import "./DonorsCard.css";
import { useNavigate } from "react-router-dom";

function DonorCard({ id, email, name, location }) {
  const navigate = useNavigate();

  if (!name || !email || !location) {
    return <div>Loading...</div>;
  }

  function handleClick() {
    navigate("/donationList");
  }

  return (
    <div className="donor-card">
      <h3>{name}</h3>
      <p>{email}</p>
      <p>{location}</p>
      <button onClick={handleClick}>See Donation</button>
    </div>
  );
}

export default DonorCard;

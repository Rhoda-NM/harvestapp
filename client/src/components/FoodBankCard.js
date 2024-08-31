import React from "react";
import { Link } from "react-router-dom";
import "./FoodBankCard.css";

function FoodBankCard({ name, image, description, email, location }) {
  if (!name || !image || !description || !email || !location) {
    return <div>Loading...</div>;
  }

 return(
    <div className="food-bank-card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>{description}</p>
      <Link to={`mailto:${email}`}>{email}</Link>
      <p>{location}</p>
    </div>
  );
}

export default FoodBankCard;

import React from "react";
import { Link } from "react-router-dom";
import "./FoodBank.css";

function FoodBankCard({ name, image, description, email, location,onClick }) {
/*   if (!name || !image || !description || !email || !location) {
    return <div>Loading...</div>;
  } */

  return (
    <div className="food-bank-contaner" onClick={onClick}>
      <div className="food-bank-card">
        <img src={image} alt={name} />
        <h3>{name}</h3>
        <p>{description}</p>
        <Link to={`mailto:${email}`}>{email}</Link>
        <p>{location}</p>
      </div>
    </div>
  );
}

export default FoodBankCard;

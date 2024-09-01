import React from "react";
import { Link } from "react-router-dom";
import "./FoodBank.css";
import foodbank from "../images/foodbank.jpeg";

const default_image = foodbank;

function FoodBankCard({ name, image, description, email, location }) {
 
  return (
    <div className="food-bank-contaner">
      <div className="food-bank-card">
        <img src={default_image || image} alt={name} />
        <h3>{name}</h3>
        <p>{description}</p>
        <Link to={`mailto:${email}`}>{email}</Link>
        <p>{location}</p>
      </div>
    </div>
  );
}

export default FoodBankCard;

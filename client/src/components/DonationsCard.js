import React from "react";
import "./Donationscard.css";
import rice from "../images/rice.jpg";

const default_image = rice;
function DonationsCard({ id, name, quantity, type, image, onEdit, onDelete }) {
 

  return (
    <div className="card">
      <img src={default_image || image} alt={name} />
      <h3>{name}</h3>
      <p>{quantity}</p>
      <p>{type}</p>
      <div className="card-buttons">
        <button onClick={() => onEdit(id)}>Edit</button>
        <button onClick={() => onDelete(id)}>Delete</button>
      </div>
    </div>
  );
}

export default DonationsCard;

import React from "react";
import './Donationscard.css';

function DonationsCard({ id, name, quantity, type, image, onEdit, onDelete }) {
  /*if (!name || !quantity || !type || !image) {
    return <div>Loading...</div>;
  }*/

  return (
    <div className="card">
      <img src={image} alt={name} />
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

import React from 'react';
import './Donationscard.css';

function NewDonationsCard({ id, name, quantity, type, image }) {
  /*if (!name || !quantity || !type || !image) {
    return <div>Loading...</div>;
  }*/

  return (
    <div className="card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>Quantity: {quantity}</p>
      <p>Type: {type}</p>
      
    </div>
  );
}

export default NewDonationsCard;

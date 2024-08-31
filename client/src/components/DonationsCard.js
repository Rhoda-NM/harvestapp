import React from "react";

function DonationsCard({ name, quantity, type, image }) {
  if (!name || !quantity || !type || !image) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h3>{name}</h3>
      <p>{quantity}</p>
      <p>{type}</p>
      <img src={image} alt={name} />
    </div>
  );
}

export default DonationsCard;

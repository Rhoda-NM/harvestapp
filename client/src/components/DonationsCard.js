import React from 'react';


// Assuming the default image is in the public folder
const DEFAULT_IMAGE_URL = "";

function DonationsCard({ name, quantity, type, image }) {
  const cardStyle = {
    border: '1px solid #E2E8F0',
    borderRadius: '8px',
    padding: '16px',
    maxWidth: '300px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Arial, sans-serif',
  };

  const titleStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '8px',
    color: '#2D3748',
  };

  const textStyle = {
    fontSize: '14px',
    color: '#4A5568',
    marginBottom: '4px',
  };

  const imageStyle = {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '4px',
    marginBottom: '12px',
  };

  return (
    <div style={cardStyle}>
      <img 
        src={image || DEFAULT_IMAGE_URL} 
        alt={name || 'Donation'} 
        style={imageStyle} 
        onError={(e) => {
          e.target.onerror = null; // Prevent infinite loop in case of failure
          e.target.src = DEFAULT_IMAGE_URL; // Fallback image
        }}
      />
      <h3 style={titleStyle}>{name || 'Unnamed Donation'}</h3>
      <p style={textStyle}>Quantity: {quantity || 'N/A'}</p>
      <p style={textStyle}>Type: {type || 'N/A'}</p>
    </div>
  );
}

export default DonationsCard;

import React, { useState } from 'react';
import axios from 'axios';
import './NewDonationForm.css'; // Importing CSS file

const NewDonationForm = () => {
  const [donorId, setDonorId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const donationData = {
      donor_id: donorId,
      quantity,
      name,
      type,
      image,
    };

    try {
      const response = await axios.post('http://127.0.0.1:5000/donations', donationData);
      setSuccess('Donation successfully created!');
      setError(null);
      // Optionally, clear the form or perform other actions here
    } catch (err) {
      console.error('Error posting donation:', err); // Improved error logging
      setError(err.response ? err.response.data.message : 'Failed to create donation. Please try again.');
      setSuccess(null);
    }
  };

  return (
    <div className="container">
      <h2>New Donation</h2>
      <form className="donation-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="donorId">Donor ID:</label>
          <input
            id="donorId"
            type="text"
            value={donorId}
            onChange={(e) => setDonorId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity:</label>
          <input
            id="quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="type">Type:</label>
          <input
            id="type"
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image URL:</label>
          <input
            id="image"
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {success && <p className="success-message">{success}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default NewDonationForm;

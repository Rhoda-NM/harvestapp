import React, { useState } from 'react';
import axios from 'axios';
import './NewDonationForm.css'

const CreateDonationForm = () => {
  const [donationData, setDonationData] = useState({
    quantity: '',
    name: '',
    type: '',
    image: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDonationData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.post('/donations', donationData);
      
      if (response.status === 201) {
        setSuccessMessage(`Donation created successfully. ID: ${response.data.id}`);
        setErrorMessage('');
        setDonationData({
          quantity: '',
          name: '',
          type: '',
          image: ''
        });
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          setErrorMessage(error.response.data.error);
        } else if (error.response.status === 500) {
          setErrorMessage('An unexpected error occurred. Please try again later.');
        }
      } else {
        setErrorMessage('Network error. Please check your connection and try again.');
      }
      setSuccessMessage('');
    }
  };

  return (
    <div className="donation-form-container">
      <h2 className="donation-form-title">Create New Donation</h2>
      <form onSubmit={handleSubmit} className="donation-form">
        <div className="form-group">
          <label htmlFor="quantity" className="form-label">Quantity:</label>
          <input
            type="number"
            className="form-input"
            id="quantity"
            name="quantity"
            value={donationData.quantity}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="name" className="form-label">Name:</label>
          <input
            type="text"
            className="form-input"
            id="name"
            name="name"
            value={donationData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="type" className="form-label">Type:</label>
          <input
            type="text"
            className="form-input"
            id="type"
            name="type"
            value={donationData.type}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="image" className="form-label">Image URL:</label>
          <input
            type="url"
            className="form-input"
            id="image"
            name="image"
            value={donationData.image}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="submit-button">Create Donation</button>
      </form>
      
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      {errorMessage && (
        <div className="error-message-global">{errorMessage}</div>
      )}
    </div>
  );
};

export default CreateDonationForm;
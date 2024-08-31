import React, { useState } from 'react';
import './DonorForm.css'; // Make sure to style your form

const DonorForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const validatePasswords = () => {
    return password === confirmPassword;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validatePasswords()) {
      setError('Passwords do not match');
      return;
    }

    const donorData = {
      username,
      email,
      name,
      location,
      password
    };

    try {
      const response = await fetch('/donors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(donorData),
      });

      if (response.ok) {
        const result = await response.json();
        setMessage('Donor registered successfully!');
        // Optionally reset the form fields here
        setUsername('');
        setEmail('');
        setName('');
        setLocation('');
        setPassword('');
        setConfirmPassword('');
      } else {
        const errorResult = await response.json();
        setError(errorResult.message || 'An error occurred');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('An error occurred');
    }
  };

  return (
    <div className="donor-form-container">
      <h2>Register as a Donor</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Register</button>
      </form>

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default DonorForm;
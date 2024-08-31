import React, { useState } from 'react';
import styled from 'styled-components';
import Footer from './Footer';
import Navbar from './Navbar';


const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic validation
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }

    const loginData = { username, password };

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const result = await response.json();
        setMessage('Login successful!');
        setError(''); // Clear any previous errors
        // Optionally handle successful login (e.g., redirect or save token)
      } else {
        const errorResult = await response.json();
        setError(errorResult.message || 'An error occurred');
        setMessage(''); // Clear any previous messages
      }
    } catch (err) {
      console.error('Error:', err);
      setError('An error occurred');
      setMessage(''); // Clear any previous messages
    }
  };

  return (
    <>
    <Navbar />
    <LoginFormContainer>
      <FormTitle>Login</FormTitle>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="username">Username:</Label>
          <Input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="password">Password:</Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormGroup>

        <Button type="submit">Login</Button>
      </form>

      {message && <SuccessMessage>{message}</SuccessMessage>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </LoginFormContainer>
    <Footer />
    </>
  );
};

const LoginFormContainer = styled.div`
  max-width: 650px;
  min-height: 400px;
  margin: 80px auto 100px auto;
  padding: 20px;
  background-color: #FFF8E1; /* Soft Cream */
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h2`
  text-align: center;
  color: #2E7D32; /* Deep Forest Green */
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #424242; /* Charcoal Gray */
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #4CAF50; /* Primary Green */
  color: #FFFFFF;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    background-color: #388E3C; /* Darker shade of green */
  }
`;

const SuccessMessage = styled.p`
  color: #4CAF50; /* Primary Green */
  font-weight: bold;
  text-align: center;
  margin-top: 15px;
`;

const ErrorMessage = styled.p`
  color: #FF9800; /* Earthy Orange */
  font-weight: bold;
  text-align: center;
  margin-top: 15px;
`;

export default LoginForm;

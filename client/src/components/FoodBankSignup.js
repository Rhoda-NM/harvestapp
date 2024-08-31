import React from 'react';
import styled from 'styled-components';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Footer from './Footer';
import Navbar from './Navbar';

const FoodBankForm = () => {
  const initialValues = {
    username: '',
    email: '',
    name: '',
    description: '',
    image: '',
    location: '',
    password: '',
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    name: Yup.string().required('Food Bank Name is required'),
    description: Yup.string(),
    image: Yup.string().url('Invalid URL format'),
    location: Yup.string().required('Location is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
  });

  const handleSubmit = async (values, { setSubmitting, setStatus, resetForm }) => {
    try {
      const response = await fetch('/foodbanks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        setStatus({ success: 'Food bank created successfully!' });
        resetForm();
      } else {
        const errorResult = await response.json();
        setStatus({ error: errorResult.message || 'An error occurred' });
      }
    } catch (err) {
      console.error('Error:', err);
      setStatus({ error: 'An error occurred' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
    <Navbar />
    <FoodBankFormContainer>
      <FormTitle>Create a Food Bank</FormTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, status }) => (
          <Form>
            <FormGroup>
              <Label htmlFor="username">Username:</Label>
              <Input type="text" id="username" name="username" />
              <ErrorMessage name="username" component={ErrorText} />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">Email:</Label>
              <Input type="email" id="email" name="email" />
              <ErrorMessage name="email" component={ErrorText} />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="name">Food Bank Name:</Label>
              <Input type="text" id="name" name="name" />
              <ErrorMessage name="name" component={ErrorText} />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="description">Description:</Label>
              <TextArea as="textarea" id="description" name="description" />
              <ErrorMessage name="description" component={ErrorText} />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="image">Image URL:</Label>
              <Input type="text" id="image" name="image" />
              <ErrorMessage name="image" component={ErrorText} />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="location">Location:</Label>
              <Input type="text" id="location" name="location" />
              <ErrorMessage name="location" component={ErrorText} />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="password">Password:</Label>
              <Input type="password" id="password" name="password" />
              <ErrorMessage name="password" component={ErrorText} />
            </FormGroup>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Food Bank'}
            </Button>

            {status && status.success && <SuccessMessage>{status.success}</SuccessMessage>}
            {status && status.error && <ErrorMessageContainer>{status.error}</ErrorMessageContainer>}
          </Form>
        )}
      </Formik>
    </FoodBankFormContainer>
    <Footer />
    </>
  );
};

const FoodBankFormContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
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

const Input = styled(Field)`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
`;

const TextArea = styled(Field)`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  resize: vertical;
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

const ErrorText = styled.div`
  color: #FF9800; /* Earthy Orange */
  margin-top: 5px;
  font-size: 14px;
`;

const SuccessMessage = styled.p`
  color: #4CAF50; /* Primary Green */
  font-weight: bold;
  text-align: center;
`;

const ErrorMessageContainer = styled.p`
  color: #FF9800; /* Earthy Orange */
  font-weight: bold;
  text-align: center;
`;


export default FoodBankForm;

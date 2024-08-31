import React from 'react';
import styled from 'styled-components';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


const DonorForm = () => {
  const initialValues = {
    username: '',
    email: '',
    name: '',
    location: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    name: Yup.string().required('Name is required'),
    location: Yup.string(),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const handleSubmit = async (values, { setSubmitting, setStatus, resetForm }) => {
    try {
      const response = await fetch('/donors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        setStatus({ success: 'Donor registered successfully!' });
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
    <DonorFormContainer>
      <FormTitle>Register as a Donor</FormTitle>
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
              <Label htmlFor="name">Name:</Label>
              <Input type="text" id="name" name="name" />
              <ErrorMessage name="name" component={ErrorText} />
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

            <FormGroup>
              <Label htmlFor="confirmPassword">Confirm Password:</Label>
              <Input type="password" id="confirmPassword" name="confirmPassword" />
              <ErrorMessage name="confirmPassword" component={ErrorText} />
            </FormGroup>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Registering...' : 'Register'}
            </Button>

            {status && status.success && <SuccessMessage>{status.success}</SuccessMessage>}
            {status && status.error && <ErrorMessageContainer>{status.error}</ErrorMessageContainer>}
          </Form>
        )}
      </Formik>
    </DonorFormContainer>
  );
};

const DonorFormContainer = styled.div`
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

export default DonorForm;

import React from 'react';
import PropTypes from 'prop-types';
import { Button, Paper, TextField } from '@mui/material';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import { Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import { MyErrorMsg, Wrapper } from './AddContactForm.styled';

const schema = yup.object().shape({
  name: yup
    .string()
    .min(3, 'must be at least 3 characters')
    .required('name is required'),
  number: yup
    .string()
    .matches(
      /\([0-9]{3}\)[ .-][0-9]{3}[ .-][0-9]{2}[ .-][0-9]{2}/,
      'Invalid format. Must be (066) 101-30-07'
    )
    .max(15, 'Invalid format. Must be (066) 101-30-07')
    .required('phone number is required'),
});

export const AddContactForm = ({ addContact }) => {
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    resetForm();
    addContact(values);
    setSubmitting(false);
  };

  return (
    <Paper elevation={12} sx={{ p: 3 }}>
      <Formik
        initialValues={{
          name: '',
          number: '',
        }}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({ dirty, isValid }) => (
          <Form
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 40,
            }}
            autoComplete="off"
          >
            <Wrapper>
              <Field
                as={TextField}
                variant="outlined"
                label="Name"
                name="name"
                type="text"
                InputLabelProps={{ shrink: true }}
                placeholder="enter the name of the contact"
                fullWidth
                aria-describedby="contact's name"
              />
              <MyErrorMsg name="name" component="div" />
            </Wrapper>
            <Wrapper>
              <Field
                as={TextField}
                variant="outlined"
                label="Phone number"
                name="number"
                type="tel"
                InputLabelProps={{ shrink: true }}
                placeholder="enter the contact's phone number"
                fullWidth
                aria-describedby="phone number"
              />
              <MyErrorMsg name="number" component="div" />
            </Wrapper>
            <Button
              type="submit"
              variant="contained"
              size="large"
              centerRipple="true"
              sx={{
                width: 200,
              }}
              disabled={!dirty || !isValid}
            >
              <ContactPhoneIcon
                sx={{
                  mr: 1.5,
                }}
              />
              ADD CONTACT
            </Button>
          </Form>
        )}
      </Formik>
    </Paper>
  );
};

AddContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
};

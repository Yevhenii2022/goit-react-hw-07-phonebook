import React from 'react';
// import PropTypes from 'prop-types';
import { Button, Paper, TextField } from '@mui/material';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import styled from '@emotion/styled';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup
    .string()
    .min(3, 'must be at least 3 characters')
    .required('name is required'),
  phone: yup
    .string()
    .matches(
      /\([0-9]{3}\)[ .-][0-9]{3}[ .-][0-9]{2}[ .-][0-9]{2}/,
      'Invalid format. Must be (066) 101-30-07'
    )
    .max(15, 'Invalid format. Must be (066) 101-30-07')
    .required('phone number is required'),
});

const MyErrorMsg = styled(ErrorMessage)`
  position: absolute;
  left: 0;
  bottom: -30px;
  color: red;
`;

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  min-height: 50px;
  margin-bottom: 20px;
`;

export const AddContactForm = props => {
  return (
    <Paper elevation={12} sx={{ p: 3 }}>
      <Formik
        initialValues={{
          name: '',
          phone: '',
        }}
        validationSchema={schema}
      >
        <Form
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 40,
          }}
        >
          <Wrapper>
            <Field
              as={TextField}
              variant="outlined"
              label="Name"
              name="name"
              type="text"
              // value={props.values.password}
              // onChange={props.handleChange}
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
              name="phone"
              type="text"
              // value={props.values.password}
              // onChange={props.handleChange}
              // helperText="input format: 066-101-30-07"
              InputLabelProps={{ shrink: true }}
              placeholder="enter the contact's phone number"
              fullWidth
              aria-describedby="phone number"
            />
            <MyErrorMsg name="phone" component="div" />
          </Wrapper>
          <Button
            type="submit"
            variant="contained"
            size="large"
            centerRipple="true"
            sx={{
              width: 200,
            }}
          >
            <ContactPhoneIcon
              sx={{
                mr: 1.5,
              }}
            />
            ADD CONTACT
          </Button>
        </Form>
      </Formik>
    </Paper>
  );
};

// AddContactForm.propTypes = {};

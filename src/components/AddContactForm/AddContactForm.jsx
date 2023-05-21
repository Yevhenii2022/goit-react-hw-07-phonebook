import React from 'react';
import PropTypes from 'prop-types';
import { Button, Paper, TextField } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { formatPhoneNumber } from '../../utils/phoneFormatter';

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
  const formik = useFormik({
    initialValues: {
      name: '',
      number: '',
    },
    validationSchema: schema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      resetForm();
      addContact(values);
      setSubmitting(false);
    },
  });

  return (
    <Paper elevation={12} sx={{ p: 3 }}>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 40,
        }}
        // autoComplete="off"
        onSubmit={formik.handleSubmit}
      >
        <TextField
          variant="outlined"
          id="name"
          label="Name"
          name="name"
          type="text"
          autoFocus
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          InputLabelProps={{ shrink: true }}
          placeholder="enter the name of the contact"
          fullWidth
          aria-describedby="contact's name"
        />

        <TextField
          variant="outlined"
          id="number"
          label="Phone number"
          name="number"
          type="tel"
          value={formik.values.number}
          onChange={evt => {
            evt.target.value = formatPhoneNumber(evt.target.value);
            formik.handleChange(evt);
          }}
          error={formik.touched.number && Boolean(formik.errors.number)}
          helperText={formik.touched.number && formik.errors.number}
          InputLabelProps={{ shrink: true }}
          placeholder="enter the contact's phone number"
          fullWidth
          aria-describedby="phone number"
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          centerRipple="true"
          sx={{
            width: 200,
          }}
        >
          <PersonAddIcon
            sx={{
              mr: 1.5,
            }}
          />
          ADD CONTACT
        </Button>
      </form>
    </Paper>
  );
};

AddContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
};

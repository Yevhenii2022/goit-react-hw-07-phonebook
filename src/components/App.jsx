import React from 'react';
import { Container, CssBaseline, Typography } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import { AddContactForm, ContactsList, MyAppBar } from './';

export const App = () => {
  return (
    <Container maxWidth="lg">
      <MyAppBar></MyAppBar>
      <Typography variant="h4" sx={{ my: 1.5 }} align="center" color="#78909c">
        Welcome to our app for saving contacts
      </Typography>
      <Typography variant="h3" sx={{ my: 1.5 }} align="center" color="#546e7a">
        PHONEBOOK
      </Typography>
      <AddContactForm />
      <ContactsList />
      <CssBaseline />
      <ToastContainer />
    </Container>
  );
};

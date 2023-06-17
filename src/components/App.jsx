import React, { useEffect } from 'react';
import { Container, CssBaseline, Typography } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import { AddContactForm, ContactsList, Loader, MyAppBar } from './';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from 'redux/operations';
import { selectIsLoading } from 'redux/selectors';

export const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

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
      {isLoading && <Loader />}
      <ToastContainer />
    </Container>
  );
};

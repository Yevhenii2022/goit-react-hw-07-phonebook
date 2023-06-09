import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Container, Paper, CssBaseline, Typography } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import { getContacts } from 'redux/selectors';
import { AddContactForm, Contacts, MyAppBar } from './';

export const App = () => {
  const contacts = useSelector(getContacts);

  return (
    <Container maxWidth="lg">
      <CssBaseline />
      <MyAppBar badgeNumber={contacts.length}></MyAppBar>
      <Typography variant="h4" sx={{ my: 1.5 }} align="center" color="#78909c">
        Welcome to our app for saving contacts
      </Typography>
      <Typography variant="h3" sx={{ my: 1.5 }} align="center" color="#546e7a">
        PHONEBOOK
      </Typography>
      <AddContactForm />
      <ToastContainer />
      <Box
        component="section"
        m="auto"
        sx={{
          mb: 5,
          maxWidth: '900px',
        }}
      >
        <Paper elevation={12} sx={{ p: 3 }}>
          <Typography variant="h4" sx={{ my: 1.5 }} align="center">
            Contacts
          </Typography>
          {contacts.length ? (
            <>
              <Contacts />
            </>
          ) : (
            <Paper elevation={10} sx={{ p: 1 }} align="center">
              <Typography variant="subtitle1: 'h4'" sx={{ my: 2 }}>
                There are no saved contacts. Use the button above to add new
                contacts.
              </Typography>
            </Paper>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

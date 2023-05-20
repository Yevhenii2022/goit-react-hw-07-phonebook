import React, { useState, useEffect } from 'react';
import { Box, Container, Paper, CssBaseline, Typography } from '@mui/material';
import { nanoid } from 'nanoid';
import { ToastContainer } from 'react-toastify';
import {
  showInfoMessage,
  showSuccessMessage,
  showErrorMessage,
} from '../utils/notifications';
import phonebook from '../data/phonebook.json';
import { AddContactForm, Contacts, MyAppBar } from './';

const getInitialСontacts = () => {
  const savedContacts = localStorage.getItem('contacts');
  if (savedContacts !== null) {
    const parsedContacts = JSON.parse(savedContacts);
    return parsedContacts;
  }
  return phonebook;
};

export const App = () => {
  const [contacts, setContacts] = useState(getInitialСontacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContactToList = ({ name, number }) => {
    const repeatNumber = contacts.find(contact => contact.number === number);

    const repeatName = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase().trim()
    );

    if (repeatName) {
      showInfoMessage(
        `The contact with name "${name}" is already in your phonebook`
      );
      return;
    } else if (repeatNumber) {
      showInfoMessage(
        `Number "${number}" is already in contacts with name "${repeatNumber.name}"`
      );
      return;
    }

    setContacts(prevState => [
      ...prevState,
      {
        id: nanoid(),
        name,
        number,
      },
    ]);
    showSuccessMessage(
      `New contact "${name}" has been added in your phone book`
    );
  };

  const getContactsList = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );
  };

  const removeContact = (idToRemove, name) => {
    setContacts(contact => contact.filter(({ id }) => id !== idToRemove));
    showErrorMessage(`You have deleted a contact "${name}"`);
  };

  return (
    <Container maxWidth="lg">
      <CssBaseline />
      <MyAppBar badgeNumber={contacts.length} setFilter={setFilter}></MyAppBar>
      <Typography variant="h4" sx={{ my: 1.5 }} align="center" color="#78909c">
        Welcome to our app for saving contacts
      </Typography>
      <Typography variant="h3" sx={{ my: 1.5 }} align="center" color="#546e7a">
        PHONEBOOK
      </Typography>
      <Box
        component="section"
        m="auto"
        sx={{
          mb: 5,
          width: 400,
        }}
      >
        <AddContactForm addContact={addContactToList} />
        <ToastContainer />
      </Box>
      <Box
        component="section"
        m="auto"
        sx={{
          mb: 5,
          width: 650,
        }}
      >
        <Paper elevation={12} sx={{ p: 3 }}>
          <Typography variant="h4" sx={{ my: 1.5 }} align="center">
            Contacts
          </Typography>
          {contacts.length ? (
            <>
              {/* <Filter setFilter={setFilter} /> */}
              <Contacts
                contacts={getContactsList()}
                removeContact={removeContact}
              />
            </>
          ) : (
            <Paper elevation={10} sx={{ p: 1 }} align="center">
              <Typography variant="subtitle1: 'h4'" sx={{ my: 2 }}>
                There are no saved contacts. Use the form above to add new
                contacts.
              </Typography>
            </Paper>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

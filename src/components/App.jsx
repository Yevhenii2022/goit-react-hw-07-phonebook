import React, { Component } from 'react';
import { Box, Container, Paper, CssBaseline, Typography } from '@mui/material';
import { nanoid } from 'nanoid';
import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.min.css';
import { AddContactForm, Contacts, Filter } from './';
import {
  showInfoMessage,
  showSuccessMessage,
  showErrorMessage,
} from '../utils/notifications';
import phonebook from '../data/phonebook.json';

export class App extends Component {
  state = {
    contacts: [...phonebook],
    filter: '',
  };

  addContactToList = ({ name, number }) => {
    const repeatNumber = this.state.contacts.find(
      item => item.number === number
    );

    if (
      this.state.contacts.some(
        contact => contact.name.toLowerCase() === name.toLowerCase().trim()
      )
    ) {
      showInfoMessage(
        `The contact with name "${name}" is already in your phonebook`
      );
      return;
    }

    if (this.state.contacts.some(contact => contact.number === number)) {
      showInfoMessage(
        `Number "${number}" is already in contacts with name "${repeatNumber.name}"`
      );
      return;
    }

    this.setState(prevState => ({
      contacts: [
        ...prevState.contacts,
        {
          id: nanoid(),
          name,
          number,
        },
      ],
    }));
    showSuccessMessage(
      `New contact "${name}" has been added in your phone book`
    );
  };

  getContactsList = () => {
    const { contacts, filter } = this.state;

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );
  };

  setFilter = filter => {
    this.setState({
      filter: filter,
    });
  };

  removeContact = (idToRemove, name) => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(({ id }) => id !== idToRemove),
    }));
    showErrorMessage(`You have deleted a contact "${name}"`);
  };

  render() {
    return (
      <Container maxWidth="md">
        <CssBaseline />
        <Typography variant="h4" sx={{ my: 1.5 }} align="center">
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
          <AddContactForm addContact={this.addContactToList} />
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
            <Typography variant="h5" sx={{ my: 1.5 }} align="center">
              Contacts
            </Typography>
            <Filter setFilter={this.setFilter} />
            <Contacts
              contacts={this.getContactsList()}
              removeContact={this.removeContact}
            />
          </Paper>
        </Box>
      </Container>
    );
  }
}

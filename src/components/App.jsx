import React, { Component } from 'react';
import { Box, Container, Paper, CssBaseline, Typography } from '@mui/material';
import { nanoid } from 'nanoid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { AddContactForm, Contacts, Filter } from './';
import phonebook from '../data/phonebook.json';

export class App extends Component {
  state = {
    contacts: [...phonebook],
    filter: '',
  };

  addContactToList = ({ name, number }) => {
    if (
      this.state.contacts.some(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      this.showNotification('This contact name is already in your phonebook');
    } else {
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
    }
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

  removeContact = idToRemove => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(({ id }) => id !== idToRemove),
    }));
  };

  showNotification = message => {
    toast.info(message);
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

import React, { Component } from 'react';
import { Box, Container, Paper, CssBaseline, Typography } from '@mui/material';
import { nanoid } from 'nanoid';
import { ToastContainer } from 'react-toastify';
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
      contact => contact.number === number
    );

    const repeatName = this.state.contacts.some(
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
    } else
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
            <Typography variant="h4" sx={{ my: 1.5 }} align="center">
              Contacts
            </Typography>
            {this.state.contacts.length ? (
              <>
                <Filter setFilter={this.setFilter} />
                <Contacts
                  contacts={this.getContactsList()}
                  removeContact={this.removeContact}
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
  }
}

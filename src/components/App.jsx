import React, { Component } from 'react';
import { Box, Container, CssBaseline, Typography } from '@mui/material';
import { AddContactForm, Contacts } from './';

export class App extends Component {
  render() {
    return (
      <>
        <CssBaseline />
        <Container maxWidth="md">
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
            <AddContactForm />
          </Box>
          <Box
            component="section"
            m="auto"
            sx={{
              mb: 5,
              width: 650,
            }}
          >
            <Contacts />
          </Box>
        </Container>
      </>
    );
  }
}

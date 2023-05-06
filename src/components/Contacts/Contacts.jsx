import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Typography } from '@mui/material';
import { Filter, ContactsList } from 'components';

export const Contacts = props => {
  return (
    <Paper elevation={12} sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ my: 1.5 }} align="center">
        Contacts
      </Typography>
      <Filter />
      <ContactsList />
    </Paper>
  );
};

Contacts.propTypes = {};

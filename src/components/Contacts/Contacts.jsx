import React from 'react';
// import PropTypes from 'prop-types';
// import { Paper, Typography } from '@mui/material';
import { ContactsList } from 'components';

export const Contacts = contacts => {
  return <ContactsList contacts={contacts} />;
};

// Contacts.propTypes = {
//   contacts: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string.isRequired,
//       name: PropTypes.string.isRequired,
//       number: PropTypes.string.isRequired,
//     }).isRequired
//   ).isRequired,
// };

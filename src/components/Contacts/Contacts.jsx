import React from 'react';
// import PropTypes from 'prop-types';
// import { Paper, Typography } from '@mui/material';
import {
  List,
  ListItem,
  ListItemAvatar,
  IconButton,
  Avatar,
  ListItemText,
  Paper,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ContactsIcon from '@mui/icons-material/Contacts';

// import { ContactsList } from 'components';

export const Contacts = contacts => {
  function generate(element) {
    return [0, 1, 2].map(value =>
      React.cloneElement(element, {
        key: value,
      })
    );
  }

  return (
    <List>
      {generate(
        <Paper elevation={12} sx={{ p: 3, my: 1.5 }}>
          <ListItem
            // key={id}
            secondaryAction={
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <Avatar>
                <ContactsIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="contactssss" />
          </ListItem>
        </Paper>
      )}
    </List>
  );
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

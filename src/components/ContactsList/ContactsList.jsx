import React from 'react';
import PropTypes from 'prop-types';
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

function generate(element) {
  return [0, 1, 2].map(value =>
    React.cloneElement(element, {
      key: value,
    })
  );
}

export const ContactsList = props => {
  return (
    <List>
      {generate(
        <Paper elevation={12} sx={{ p: 3, my: 1.5 }}>
          <ListItem
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
            <ListItemText primary="Single-line item" />
          </ListItem>
        </Paper>
      )}
    </List>
  );
};

ContactsList.propTypes = {};

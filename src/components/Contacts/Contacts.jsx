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

import { getColorFromName } from '../../utils/getColorFromName';
import { getFirstTwoLetters } from '../../utils/getFirstTwoLetters';

export const Contacts = ({ contacts, removeContact }) => {
  const handleRemoveBtnClick = evt => {
    removeContact(evt.currentTarget.dataset.id, evt.currentTarget.dataset.name);
  };

  return (
    <List>
      {contacts.map(({ id, name, number }) => (
        <Paper elevation={12} sx={{ p: 3, my: 1.5 }}>
          <ListItem
            key={id}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                data-id={id}
                data-name={name}
                onClick={evt => handleRemoveBtnClick(evt)}
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <Avatar
                sx={{
                  mr: 2,
                  bgcolor: getColorFromName(
                    getFirstTwoLetters(name).toUpperCase()
                  ),
                  height: 50,
                  width: 50,
                }}
              >
                {getFirstTwoLetters(name).toUpperCase()}
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={`${name}  ${number}`} />
          </ListItem>
        </Paper>
      ))}
    </List>
  );
};

Contacts.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  removeContact: PropTypes.func.isRequired,
};

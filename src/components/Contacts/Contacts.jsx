import React from 'react';
import PropTypes from 'prop-types';
import {
  List,
  ListItem,
  ListItemAvatar,
  IconButton,
  Avatar,
  Stack,
  Box,
  Typography,
  Paper,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { getColorFromName } from '../../utils/getColorFromName';
import { getFirstTwoLetters } from '../../utils/getFirstTwoLetters';

export const Contacts = ({ contacts, removeContact, theme }) => {
  const handleRemoveBtnClick = evt => {
    removeContact(evt.currentTarget.dataset.id, evt.currentTarget.dataset.name);
  };

  return (
    <List>
      {contacts.map(({ id, name, number }) => (
        <Paper
          elevation={12}
          sx={{ p: 3, my: 1.5, mx: 'auto', maxWidth: '800px' }}
        >
          <ListItem
            key={id}
            secondaryAction={
              <Stack direction="row" alignItems="center" spacing={1}>
                <a
                  href={`tel:+38${number.replace(/[^\d]/g, '')}`}
                  aria-label="call"
                >
                  <Avatar sx={{ backgroundColor: '#4caf50', mr: 1 }}>
                    <PhoneInTalkIcon />
                  </Avatar>
                </a>
                <IconButton
                  color="primary"
                  aria-label="edit contact"
                  data-id={id}
                >
                  <BorderColorIcon />
                </IconButton>
                <IconButton
                  color="error"
                  // edge="end"
                  aria-label="delete contact"
                  data-id={id}
                  data-name={name}
                  onClick={evt => handleRemoveBtnClick(evt)}
                >
                  <DeleteIcon />
                </IconButton>
              </Stack>
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
            <Box>
              <Typography variant="h6">{name}</Typography>
              <Typography>{number}</Typography>
            </Box>
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

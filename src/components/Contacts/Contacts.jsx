import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  List,
  ListItem,
  ListItemAvatar,
  IconButton,
  Paper,
  Typography,
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { getContacts, getFilter } from 'redux/selectors';
import { deleteContact } from 'redux/contactsSlice';
import { showErrorMessage } from '../../utils/notifications';
import { getColorFromName } from '../../utils/getColorFromName';
import { getFirstTwoLetters } from '../../utils/getFirstTwoLetters';
import {
  StyledPaper,
  StyledAvatar,
  StyledTypography,
  StyledStack,
} from './Contacts.styled';

export const Contacts = ({ theme }) => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  const filteredContacts = contacts.filter(({ name }) =>
    name.toLowerCase().includes(filter)
  );

  const handleDeleteContact = (id, name) => {
    dispatch(deleteContact(id));
    showErrorMessage(`You have deleted a contact "${name}"`);
  };

  if (!filteredContacts?.length) {
    return (
      <Paper
        elevation={10}
        sx={{ mx: 'auto', p: 1, maxWidth: 330 }}
        align="center"
      >
        <Typography variant="subtitle1: 'h4'" sx={{ my: 2 }}>
          No contact was found for your request.
        </Typography>
      </Paper>
    );
  }

  return (
    <List>
      {filteredContacts.map(({ id, name, number }) => (
        <StyledPaper
          elevation={12}
          sx={{ p: 3, my: 1.5, mx: 'auto', maxWidth: '800px' }}
        >
          <ListItem
            key={id}
            secondaryAction={
              <StyledStack direction="row" alignItems="center" spacing={1}>
                <a
                  href={`tel:+38${number.replace(/[^\d]/g, '')}`}
                  aria-label="call"
                >
                  <StyledAvatar sx={{ backgroundColor: '#4caf50', mr: 1 }}>
                    <PhoneInTalkIcon />
                  </StyledAvatar>
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
                  onClick={() => handleDeleteContact(id, name)}
                >
                  <DeleteIcon />
                </IconButton>
              </StyledStack>
            }
          >
            <ListItemAvatar>
              <StyledAvatar
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
              </StyledAvatar>
            </ListItemAvatar>
            <Box>
              <StyledTypography variant="h6">{name}</StyledTypography>
              <StyledTypography>{number}</StyledTypography>
            </Box>
          </ListItem>
        </StyledPaper>
      ))}
    </List>
  );
};

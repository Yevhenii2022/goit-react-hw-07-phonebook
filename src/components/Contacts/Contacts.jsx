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
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { getColorFromName } from '../../utils/getColorFromName';
import { getFirstTwoLetters } from '../../utils/getFirstTwoLetters';

const StyledPaper = styled(Paper)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0),
    height: theme.spacing(15.5),
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    margin: theme.spacing(0),
    height: 40,
    width: 40,
  },
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    fontSize: theme.spacing(1.85),
  },
}));

const StyledStack = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    marginTop: theme.spacing(15),
  },
}));

export const Contacts = ({ contacts, removeContact, theme }) => {
  const handleRemoveBtnClick = evt => {
    removeContact(evt.currentTarget.dataset.id, evt.currentTarget.dataset.name);
  };

  return (
    <List>
      {contacts.map(({ id, name, number }) => (
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
                  onClick={evt => handleRemoveBtnClick(evt)}
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

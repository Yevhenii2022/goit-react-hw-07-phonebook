import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogTitle,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteContact } from 'redux/operations';
import { selectIsLoading } from 'redux/selectors';
// import { showErrorMessage } from '../../utils/notifications';

export const DropdownDeleteContact = ({ id, name }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const handleDeleteContact = (id, name) => {
  //   dispatch(deleteContact(id));
  //   // showErrorMessage(`You have deleted a contact "${name}"`);
  // };

  return (
    <>
      <IconButton
        color="error"
        aria-label="delete contact"
        data-id={id}
        data-name={name}
        onClick={handleClickOpen}
        disabled={isLoading}
      >
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Do you want to remove a contact named "{name}"?
        </DialogTitle>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            NOT
          </Button>
          <Button color="success" onClick={() => dispatch(deleteContact(id))}>
            YES
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

DropdownDeleteContact.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

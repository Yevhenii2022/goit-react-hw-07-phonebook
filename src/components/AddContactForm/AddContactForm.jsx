import React from 'react';
// import PropTypes from 'prop-types';
import { Button, TextField, Modal, Box } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { styled } from '@mui/material/styles';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contactsSlice';
// import { getContacts } from '../../redux/selectors';
import { formatPhoneNumber } from '../../utils/phoneFormatter';

const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  margin: 0,
  transform: 'translate(-50%, -50%)',
  width: 390,
  bgcolor: 'background.paper',
  border: '2px solid #303f9f',
  borderRadius: 1.5,
  boxShadow: 24,
  p: 4,
};

const schema = yup.object().shape({
  name: yup
    .string()
    .min(3, 'must be at least 3 characters')
    .required('name is required'),
  number: yup
    .string()
    .matches(
      /\([0-9]{3}\)[ .-][0-9]{3}[ .-][0-9]{2}[ .-][0-9]{2}/,
      'Invalid format. Must be (066) 101-30-07'
    )
    .max(15, 'Invalid format. Must be (066) 101-30-07')
    .required('phone number is required'),
});

const StyledButton = styled(Button)(({ theme }) => ({
  // marginRight: theme.spacing(2),
  // marginLeft: 0,
  // width: '100%',
  [theme.breakpoints.down('sm')]: {
    marginLeft: theme.spacing(2),
  },
}));

export const AddContactForm = () => {
  // const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      number: '',
    },
    validationSchema: schema,
    onSubmit: ({ name, number }, { setSubmitting, resetForm }) => {
      resetForm();
      dispatch(addContact(name, number));
      setSubmitting(false);
      setOpen(false);
    },
  });

  return (
    <>
      <StyledButton
        variant="outlined"
        size="large"
        startIcon={<PersonAddIcon />}
        aria-label="create contact"
        onClick={handleOpen}
        sx={{ mb: 4, ml: 9.5 }}
      >
        CREATE A NEW CONTACT
      </StyledButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-add-contact-title"
        aria-describedby="modal-add-contact-description"
      >
        <Box sx={styleModal}>
          <form
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 40,
            }}
            // autoComplete="off"
            onSubmit={formik.handleSubmit}
          >
            <TextField
              variant="outlined"
              id="name"
              label="Name"
              name="name"
              type="text"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              InputLabelProps={{ shrink: true }}
              placeholder="enter the name of the contact"
              fullWidth
              aria-describedby="contact's name"
            />

            <TextField
              variant="outlined"
              id="number"
              label="Phone number"
              name="number"
              type="tel"
              value={formik.values.number}
              onChange={evt => {
                evt.target.value = formatPhoneNumber(evt.target.value);
                formik.handleChange(evt);
              }}
              error={formik.touched.number && Boolean(formik.errors.number)}
              helperText={formik.touched.number && formik.errors.number}
              InputLabelProps={{ shrink: true }}
              placeholder="enter the contact's phone number"
              fullWidth
              aria-describedby="phone number"
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              centerRipple="true"
              sx={{
                width: 200,
              }}
            >
              <PersonAddIcon
                sx={{
                  mr: 1.5,
                }}
              />
              ADD CONTACT
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
};

// AddContactForm.propTypes = {
//   addContact: PropTypes.func.isRequired,
// };

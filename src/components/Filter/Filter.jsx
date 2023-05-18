import { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import InputAdornment from '@mui/material/InputAdornment';

export const Filter = ({ setFilter }) => {
  const [value, setValue] = useState('');

  const handleInputChange = ({ target }) => {
    setValue(target.value);
    setFilter(target.value.toLowerCase().trim());
  };

  return (
    <div>
      <TextField
        style={{
          width: 300,
        }}
        variant="outlined"
        type="text"
        value={value}
        onChange={handleInputChange}
        InputLabelProps={{ shrink: true }}
        placeholder="find a contact by name"
        aria-describedby="find a contact by name"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonSearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

Filter.propTypes = {
  setFilter: PropTypes.func.isRequired,
};

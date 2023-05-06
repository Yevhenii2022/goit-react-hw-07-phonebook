import React, { Component } from 'react';
import { TextField } from '@mui/material';

import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import InputAdornment from '@mui/material/InputAdornment';

export class Filter extends Component {
  render() {
    return (
      <div>
        <TextField
          style={{
            width: 300,
          }}
          variant="outlined"
          // label="Name"
          type="text"
          // value={props.values.password}
          // onChange={props.handleChange}
          InputLabelProps={{ shrink: true }}
          placeholder="find a contact by name"
          // fullWidth
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
  }
}

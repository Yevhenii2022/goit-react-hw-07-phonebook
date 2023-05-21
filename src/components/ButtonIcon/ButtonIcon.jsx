// import * as React from 'react';
import { Button, Stack } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export const ButtonIconAdd = ({ children }) => {
  return (
    <Stack direction="row" spacing={2} sx={{ my: 2, ml: 9.5 }}>
      <Button variant="outlined" size="large" startIcon={<PersonAddIcon />}>
        {children}
      </Button>
    </Stack>
  );
};

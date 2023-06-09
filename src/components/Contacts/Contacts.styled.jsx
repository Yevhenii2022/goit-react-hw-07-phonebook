import { styled } from '@mui/material/styles';
import { Avatar, Stack, Typography, Paper } from '@mui/material';

export const StyledPaper = styled(Paper)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0),
    height: theme.spacing(15.5),
  },
}));

export const StyledAvatar = styled(Avatar)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    margin: theme.spacing(0),
    height: 40,
    width: 40,
  },
}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    fontSize: theme.spacing(1.85),
  },
}));

export const StyledStack = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    marginTop: theme.spacing(15),
  },
}));

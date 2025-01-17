import { ThemeOptions } from '@mui/material/styles';

export const theme: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#9022FF',
      light: '#2C2135',
      dark: '#A1C4FA', //kolor do zmiany
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FFFFFF',
      light: '#CAD1DB',
      contrastText: '#DCDCDC',
    },
    background: {
      default: '#1A151F',
      paper: '#211928',
    },
    text: {
      primary: '#262226',
    },
  },
  typography: {
    fontFamily: 'unset',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        colorInherit: '#ffffff',
      },
    },
  },
};

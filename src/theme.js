import { Rubik } from '@next/font/google';
import { createTheme } from '@mui/material/styles';

export const rubik = Rubik({
  display: 'swap',
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

const theme = createTheme({
  palette: {
    primary: {
      main: '#654efc',
    },
  },
  typography: {
    fontFamily: rubik.style.fontFamily,
  },
});

export default theme;

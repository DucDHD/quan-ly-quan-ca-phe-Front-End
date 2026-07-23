import { extendTheme } from '@mui/material/styles'

// Create a theme instance.
const theme = extendTheme({
   typography: {
    fontFamily: "'Poppins', sans-serif",
  },

  palette: {
    primary: {
      main: '#079992',
    },

    secondary: {
      main: '#fd7e14',
    },

    background: {
      default: '#eef2f5',
      paper: '#ffffff',
    },

    text: {
      primary: '#34495e',
      secondary: '#7f8c8d',
    },

    divider: '#ebebeb',
  },

  shape: {
    borderRadius: 10,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: "'Poppins', sans-serif",
        },
      },
    },
  },
})

export default theme
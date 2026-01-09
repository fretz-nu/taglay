import { createTheme } from '@mui/material/styles';

// Hacker Terminal Theme for Material-UI
// Matches the main page's aesthetic with matrix green colors and monospace fonts

const hackerTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00ff00', // Matrix green
      light: '#00ff88',
      dark: '#00cc00',
      contrastText: '#000000',
    },
    secondary: {
      main: '#00cc00', // Dark green
      light: '#00dd00',
      dark: '#008800',
      contrastText: '#000000',
    },
    background: {
      default: '#000000', // Deep black
      paper: '#0d1a0d', // Dark green card background
    },
    text: {
      primary: '#00ff00', // Matrix green
      secondary: '#00cc00', // Dark green
      disabled: '#008800', // Dim green
    },
    success: {
      main: '#00ff00',
    },
    info: {
      main: '#22d3ee',
    },
    warning: {
      main: '#ffaa00',
    },
    error: {
      main: '#ff0040',
    },
    divider: '#00ff00',
    action: {
      active: '#00ff00',
      hover: 'rgba(0, 255, 0, 0.08)',
      selected: 'rgba(0, 255, 0, 0.12)',
      disabledBackground: 'rgba(0, 136, 0, 0.12)',
    },
  },
  typography: {
    fontFamily: '"Space Mono", "Share Tech Mono", "Courier New", monospace',
    h1: {
      fontFamily: '"Share Tech Mono", "Space Mono", "Courier New", monospace',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      color: '#00ff00',
    },
    h2: {
      fontFamily: '"Share Tech Mono", "Space Mono", "Courier New", monospace',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      color: '#00ff00',
    },
    h3: {
      fontFamily: '"Share Tech Mono", "Space Mono", "Courier New", monospace',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      color: '#00ff00',
    },
    h4: {
      fontFamily: '"Share Tech Mono", "Space Mono", "Courier New", monospace',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      color: '#00ff00',
    },
    h5: {
      fontFamily: '"Share Tech Mono", "Space Mono", "Courier New", monospace',
      fontWeight: 500,
      textTransform: 'uppercase',
    },
    h6: {
      fontFamily: '"Share Tech Mono", "Space Mono", "Courier New", monospace',
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
    },
    body1: {
      fontFamily: '"Space Mono", "Share Tech Mono", "Courier New", monospace',
      color: '#00cc00',
    },
    body2: {
      fontFamily: '"Space Mono", "Share Tech Mono", "Courier New", monospace',
      color: '#00cc00',
    },
    button: {
      fontFamily: '"Share Tech Mono", "Space Mono", "Courier New", monospace',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      fontWeight: 600,
    },
    caption: {
      fontFamily: '"Space Mono", "Share Tech Mono", "Courier New", monospace',
      color: '#008800',
    },
    overline: {
      fontFamily: '"Share Tech Mono", "Space Mono", "Courier New", monospace',
      letterSpacing: '0.15em',
    },
  },
  shape: {
    borderRadius: 4,
  },
  shadows: [
    'none',
    '0 0 20px rgba(0, 255, 0, 0.2), inset 0 0 20px rgba(0, 255, 0, 0.05)',
    '0 0 30px rgba(0, 255, 0, 0.3), inset 0 0 30px rgba(0, 255, 0, 0.1)',
    '0 0 40px rgba(0, 255, 0, 0.4)',
    '0 18px 50px rgba(0, 255, 0, 0.15)',
    '0 0 50px rgba(0, 255, 0, 0.5)',
    '0 0 60px rgba(0, 255, 0, 0.6)',
    '0 0 70px rgba(0, 255, 0, 0.7)',
    '0 0 80px rgba(0, 255, 0, 0.8)',
    '0 0 90px rgba(0, 255, 0, 0.9)',
    '0 0 100px rgba(0, 255, 0, 1)',
    '0 0 110px rgba(0, 255, 0, 1)',
    '0 0 120px rgba(0, 255, 0, 1)',
    '0 0 130px rgba(0, 255, 0, 1)',
    '0 0 140px rgba(0, 255, 0, 1)',
    '0 0 150px rgba(0, 255, 0, 1)',
    '0 0 160px rgba(0, 255, 0, 1)',
    '0 0 170px rgba(0, 255, 0, 1)',
    '0 0 180px rgba(0, 255, 0, 1)',
    '0 0 190px rgba(0, 255, 0, 1)',
    '0 0 200px rgba(0, 255, 0, 1)',
    '0 0 210px rgba(0, 255, 0, 1)',
    '0 0 220px rgba(0, 255, 0, 1)',
    '0 0 230px rgba(0, 255, 0, 1)',
  ],
  components: {
    // Button component styling
    MuiButton: {
      styleOverrides: {
        root: {
          borderWidth: '1px',
          borderStyle: 'solid',
          borderRadius: '2px',
          transition: 'all 0.18s ease',
          position: 'relative',
          overflow: 'hidden',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 0 30px rgba(0, 255, 0, 0.5), inset 0 0 30px rgba(0, 255, 0, 0.1)',
          },
        },
        containedPrimary: {
          backgroundColor: 'transparent',
          color: '#00ff00',
          borderColor: '#00ff00',
          boxShadow: '0 0 20px rgba(0, 255, 0, 0.2), inset 0 0 20px rgba(0, 255, 0, 0.05)',
          '&:hover': {
            backgroundColor: 'rgba(0, 255, 0, 0.1)',
            color: '#00ff88',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        outlinedPrimary: {
          color: '#00ff00',
          borderColor: '#00ff00',
          '&:hover': {
            backgroundColor: 'rgba(0, 255, 0, 0.1)',
            borderColor: '#00ff00',
            color: '#00ff88',
          },
        },
        outlinedSecondary: {
          color: '#00cc00',
          borderColor: '#008800',
          '&:hover': {
            backgroundColor: 'rgba(0, 255, 0, 0.1)',
            borderColor: '#00ff00',
            color: '#00ff88',
          },
        },
      },
    },
    // AppBar styling
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(0, 0, 0, 0.95)',
          backdropFilter: 'blur(4px)',
          borderBottom: '1px solid #00ff00',
          boxShadow: '0 0 20px rgba(0, 255, 0, 0.2), inset 0 0 20px rgba(0, 255, 0, 0.05)',
        },
      },
    },
    // Drawer styling
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#0a0f0a',
          borderRight: '1px solid #00ff00',
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(0, 255, 0, 0.03) 0px, rgba(0, 255, 0, 0.03) 1px, transparent 1px, transparent 2px)',
          backgroundSize: '100% 4px',
        },
      },
    },
    // ListItem styling for sidebar
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
          margin: '4px 8px',
          '&:hover': {
            backgroundColor: 'rgba(0, 255, 0, 0.1)',
          },
          '&.Mui-selected': {
            backgroundColor: 'rgba(0, 255, 0, 0.15)',
            border: '1px solid #00ff00',
            '&:hover': {
              backgroundColor: 'rgba(0, 255, 0, 0.2)',
            },
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontFamily: "'Share Tech Mono', monospace",
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: '#00ff00',
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: '#00ff00',
        },
      },
    },
    // TextField styling
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            color: '#00ff00',
            '& fieldset': {
              borderColor: '#008800',
            },
            '&:hover fieldset': {
              borderColor: '#00ff00',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#00ff00',
              boxShadow: '0 0 10px rgba(0, 255, 0, 0.3)',
            },
          },
          '& .MuiInputLabel-root': {
            fontFamily: "'Space Mono', monospace",
            color: '#00cc00',
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#00ff00',
          },
          '& .MuiInputBase-input': {
            fontFamily: "'Space Mono', monospace",
            color: '#00ff00',
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontFamily: "'Space Mono', monospace",
          color: '#00ff00',
        },
        input: {
          fontFamily: "'Space Mono', monospace",
          color: '#00ff00',
        },
      },
    },
    // Modal styling
    MuiModal: {
      styleOverrides: {
        root: {
          '& .MuiBackdrop-root': {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
          },
        },
      },
    },
    // Paper styling (used in Modal)
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#0d1a0d',
          border: '1px solid #00ff00',
          boxShadow: '0 0 40px rgba(0, 255, 0, 0.3)',
        },
        elevation1: {
          boxShadow: '0 0 20px rgba(0, 255, 0, 0.2), inset 0 0 20px rgba(0, 255, 0, 0.05)',
        },
      },
    },
    // Divider styling
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: '#008800',
          opacity: 0.5,
        },
      },
    },
    // Switch styling
    MuiSwitch: {
      styleOverrides: {
        root: {
          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
            backgroundColor: 'rgba(0, 255, 0, 0.3)',
            borderColor: '#00ff00',
          },
          '& .MuiSwitch-switchBase.Mui-checked .MuiSwitch-thumb': {
            backgroundColor: '#00ff00',
            boxShadow: '0 0 10px rgba(0, 255, 0, 0.8)',
          },
        },
        track: {
          backgroundColor: 'rgba(0, 136, 0, 0.3)',
          border: '1px solid #008800',
        },
        thumb: {
          backgroundColor: '#00cc00',
        },
      },
    },
    // Select styling
    MuiSelect: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#008800',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#00ff00',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#00ff00',
            boxShadow: '0 0 10px rgba(0, 255, 0, 0.3)',
          },
        },
        icon: {
          color: '#00ff00',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontFamily: "'Space Mono', monospace",
          color: '#00cc00',
          '&:hover': {
            backgroundColor: 'rgba(0, 255, 0, 0.1)',
          },
          '&.Mui-selected': {
            backgroundColor: 'rgba(0, 255, 0, 0.15)',
            color: '#00ff00',
          },
        },
      },
    },
    // InputLabel styling
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: "'Space Mono', monospace",
          color: '#00cc00',
          '&.Mui-focused': {
            color: '#00ff00',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#00ff00',
          '&:hover': {
            backgroundColor: 'rgba(0, 255, 0, 0.1)',
          },
        },
      },
    },
    // FormControl styling
    MuiFormControl: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            color: '#00ff00',
          },
        },
      },
    },
  },
  overrides: {
    MuiStyle: {
      styleOverrides: {
        root: {
          typography: {
            fontFamily: '"Space Mono", "Share Tech Mono", "Courier New", monospace',
          },
        },
      },
    },
  },
});

export default hackerTheme;

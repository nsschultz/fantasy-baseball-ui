import { createMuiTheme } from '@material-ui/core';

export default () => createMuiTheme({
  palette: {
    action: { 
      active: '#ffffff', 
      disabled: '#4d4d4d', 
      disabledBackground: '#1f1f1f', 
      hover: '#141414', 
      selected: '#292929' 
    },
    background: { 
      default: '#222222', 
      paper: '#333333' 
    },
    divider: '#444444',
    primary: { 
      main: '#2c387e', 
      secondary: '#1c54b2' 
    },
    secondary: { 
      main: '#c80000', 
      secondary: '#b81c33' 
    },
    text: { 
      disabled: '#808080', 
      primary: '#ffffff', 
      secondary: '#b3b3b3'
    }
  },
  shadows: [
    'none',
    '0 0 0 1px rgba(63,63,68,0.05), 0 1px 2px 0 rgba(63,63,68,0.15)',
    '0 0 1px 0 rgba(0,0,0,0.81), 0 2px 2px -2px rgba(0,0,0,0.75)',
    '0 0 1px 0 rgba(0,0,0,0.81), 0 3px 4px -2px rgba(0,0,0,0.75)',
    '0 0 1px 0 rgba(0,0,0,0.81), 0 3px 4px -2px rgba(0,0,0,0.75)',
    '0 0 1px 0 rgba(0,0,0,0.81), 0 4px 6px -2px rgba(0,0,0,0.75)',
    '0 0 1px 0 rgba(0,0,0,0.81), 0 4px 6px -2px rgba(0,0,0,0.75)',
    '0 0 1px 0 rgba(0,0,0,0.81), 0 4px 8px -2px rgba(0,0,0,0.75)',
    '0 0 1px 0 rgba(0,0,0,0.81), 0 5px 8px -2px rgba(0,0,0,0.75)',
    '0 0 1px 0 rgba(0,0,0,0.81), 0 6px 12px -4px rgba(0,0,0,0.75)',
    '0 0 1px 0 rgba(0,0,0,0.81), 0 7px 12px -4px rgba(0,0,0,0.75)',
    '0 0 1px 0 rgba(0,0,0,0.81), 0 6px 16px -4px rgba(0,0,0,0.75)',
    '0 0 1px 0 rgba(0,0,0,0.81), 0 7px 16px -4px rgba(0,0,0,0.75)',
    '0 0 1px 0 rgba(0,0,0,0.81), 0 8px 18px -8px rgba(0,0,0,0.75)',
    '0 0 1px 0 rgba(0,0,0,0.81), 0 9px 18px -8px rgba(0,0,0,0.75)',
    '0 0 1px 0 rgba(0,0,0,0.81), 0 10px 20px -8px rgba(0,0,0,0.75)',
    '0 0 1px 0 rgba(0,0,0,0.81), 0 11px 20px -8px rgba(0,0,0,0.75)',
    '0 0 1px 0 rgba(0,0,0,0.81), 0 12px 22px -8px rgba(0,0,0,0.75)',
    '0 0 1px 0 rgba(0,0,0,0.81), 0 13px 22px -8px rgba(0,0,0,0.75)',
    '0 0 1px 0 rgba(0,0,0,0.81), 0 14px 24px -8px rgba(0,0,0,0.75)',
    '0 0 1px 0 rgba(0,0,0,0.81), 0 16px 28px -8px rgba(0,0,0,0.75)',
    '0 0 1px 0 rgba(0,0,0,0.81), 0 18px 30px -8px rgba(0,0,0,0.75)',
    '0 0 1px 0 rgba(0,0,0,0.81), 0 20px 32px -8px rgba(0,0,0,0.75)',
    '0 0 1px 0 rgba(0,0,0,0.81), 0 22px 34px -8px rgba(0,0,0,0.75)',
    '0 0 1px 0 rgba(0,0,0,0.81), 0 24px 36px -8px rgba(0,0,0,0.75)'
  ],
  typography: {
    h1: { fontWeight: 500, fontSize: 35, letterSpacing: '-0.24px' },
    h2: { fontWeight: 500, fontSize: 29, letterSpacing: '-0.24px' },
    h3: { fontWeight: 500, fontSize: 24, letterSpacing: '-0.06px' },
    h4: { fontWeight: 500, fontSize: 20, letterSpacing: '-0.06px' },
    h5: { fontWeight: 500, fontSize: 16, letterSpacing: '-0.05px' },
    h6: { fontWeight: 500, fontSize: 14, letterSpacing: '-0.05px' },
    overline: { fontWeight: 500 }
  },
});
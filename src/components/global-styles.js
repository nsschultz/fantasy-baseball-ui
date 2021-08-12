import { createStyles, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => createStyles({
  '@global': {
    '*': { boxSizing: 'border-box', margin: 0, padding: 0 },
    '.MuiCardHeader-root': { backgroundColor: '#2c387e', color: '#ffffff' },
    '.MuiTableCell-head': { backgroundColor: '#2c387e', color: '#ffffff' },
    '#root': { height: '100%', width: '100%' },
    a: { textDecoration: 'none' },
    body: { height: '100%', width: '100%' },
    html: {
      '-webkit-font-smoothing': 'antialiased',
      '-moz-osx-font-smoothing': 'grayscale',
      height: '100%',
      width: '100%'
    }
  }
}));

export default () => {
  useStyles();
  return null;
};
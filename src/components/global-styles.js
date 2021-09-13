import { createStyles, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => createStyles({
  '@global': {
    '*': { boxSizing: 'border-box', margin: 0, padding: 0 },
    '.MuiCard-root' : { display: 'flex', flexDirection: 'column', height: '100%' },
    '.MuiCardHeader-root': { backgroundColor: theme.palette.primary.main, color: theme.palette.text.primary },
    '.MuiTableCell-head' : { backgroundColor: theme.palette.primary.main, color: theme.palette.text.primary },
    '.MuiTableContainer-root': { display: 'flex', overflowX: 'initial' },
    '.MuiTableRow-root'  : { backgroundColor: theme.palette.background.paper, color: theme.palette.text.primary },
    '#root': { height: '100%', width: '100%' },
    a: { textDecoration: 'none' },
    body: { height: '100%', width: '100%' },
    html: { '-webkit-font-smoothing': 'antialiased', '-moz-osx-font-smoothing': 'grayscale', height: '100%', width: '100%' }
  }
}));

export default (theme) => {
  useStyles(theme);
  return null;
};
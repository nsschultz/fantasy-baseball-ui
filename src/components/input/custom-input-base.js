import { InputBase } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

export default withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    backgroundColor: theme.palette.background.paper,
    border: '1px solid ' + theme.palette.text.secondary,
    borderRadius: 1,
    fontSize: 10,
    height: 20,
    padding: '5px 5px 5px 5px',
    position: 'relative',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      backgroundColor: theme.palette.background.paper,
      borderColor: theme.palette.text.primary,
      borderRadius: 1,
      boxShadow: '0 0 0 0.2rem rgba(255,255,255,.5)',
    },
  },
}))(InputBase);
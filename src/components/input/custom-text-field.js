import { TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

export default withStyles(theme => ({ 
  root: { 
    '& label.Mui-focused': { 
      color: theme.palette.text.secondary 
    } 
  }
}))(TextField);
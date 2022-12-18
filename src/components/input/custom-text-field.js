import { TextField } from "@mui/material";
import { withStyles } from "@mui/styles";

/**
 * Wrapper over the TextField that just adds styling.
 */
export default withStyles((theme) => ({
  root: {
    "& label.Mui-focused": {
      color: theme.palette.text.secondary,
    },
  },
}))(TextField);

import { TextField } from "@mui/material";
import { withStyles } from "@mui/styles";

export default withStyles((theme) => ({
  root: {
    "& label.Mui-focused": {
      color: theme.palette.text.secondary,
    },
  },
}))(TextField);

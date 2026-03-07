import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledTextField = styled(TextField)(({ theme }) => ({ "& label.Mui-focused": { color: theme.palette.secondary.main } }));

import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

/**
 * Wrapper over the TextField that just adds styling.
 */
export const StyledTextField = styled(TextField)(() => ({ root: { "& label.Mui-focused": { color: "text.secondary" } } }));

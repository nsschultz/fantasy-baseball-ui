import { createStyles, makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    "@global": {
      "*": { boxSizing: "border-box", margin: 0, padding: 0 },
      ".MuiCard-root": { display: "flex", flexDirection: "column", height: "100%" },
      ".MuiCardHeader-root": { backgroundColor: theme.palette.primary.main, color: theme.palette.text.primary },
      ".MuiTableCell-head": { backgroundColor: theme.palette.primary.main, color: theme.palette.text.primary },
      ".MuiTableRow-root": { backgroundColor: theme.palette.background.paper, color: theme.palette.text.primary },
      "#root": { height: "100%", width: "100%" },
      a: { textDecoration: "none" },
      body: { height: "100%", width: "100%" },
      html: { "-webkit-font-smoothing": "antialiased", "-moz-osx-font-smoothing": "grayscale", height: "100%", width: "100%" },
    },
  })
);

/**
 * Creates the global styles for the base objects (material or html).
 * @param {object} theme The GlobalTheme object.
 * @returns A new instance of the GlobalStyles object.
 */
const GlobalStyles = (theme) => {
  useStyles(theme);
  return null;
};
export default GlobalStyles;

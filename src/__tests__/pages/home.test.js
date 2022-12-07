import { render, screen } from "@testing-library/react";

import GlobalTheme from "../../components/global-theme";
import Home from "../../pages/home";
import { ThemeProvider } from "@mui/material";

it("should render the header", () => {
  render(
    <ThemeProvider theme={GlobalTheme()}>
      <Home />
    </ThemeProvider>
  );
  expect(screen.getByText("Welcome to the Fantasy Baseball Analyzer")).toBeTruthy();
});

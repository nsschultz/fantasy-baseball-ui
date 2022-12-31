import { fireEvent, render, screen } from "@testing-library/react";

import GlobalTheme from "../../global-theme";
import { StyledTextField } from "./styled-text-field";
import { ThemeProvider } from "@mui/material";

describe("StyledTextField", () => {
  test("should render and act like a TextField", () => {
    render(
      <ThemeProvider theme={GlobalTheme()}>
        <StyledTextField />
      </ThemeProvider>
    );
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Text Change" } });
    expect(input.value).toBe("Text Change");
  });
});

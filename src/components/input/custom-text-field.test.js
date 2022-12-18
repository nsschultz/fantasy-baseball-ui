import { fireEvent, render, screen } from "@testing-library/react";

import CustomTextField from "./custom-text-field";
import GlobalTheme from "../global-theme";
import { ThemeProvider } from "@mui/material";

describe("CustomTextField", () => {
  test("should render and act like a TextField", () => {
    render(
      <ThemeProvider theme={GlobalTheme()}>
        <CustomTextField />
      </ThemeProvider>
    );
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Text Change" } });
    expect(input.value).toBe("Text Change");
  });
});

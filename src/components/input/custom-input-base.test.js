import { fireEvent, render, screen } from "@testing-library/react";

import CustomInputBase from "./custom-input-base";
import GlobalTheme from "../../global-theme";
import { ThemeProvider } from "@mui/material";

describe("CustomInputBase", () => {
  test("should render and function like an input", () => {
    render(
      <ThemeProvider theme={GlobalTheme()}>
        <CustomInputBase />
      </ThemeProvider>
    );
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Text Change" } });
    expect(input.value).toBe("Text Change");
  });
});

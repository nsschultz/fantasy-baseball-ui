import { fireEvent, render, screen } from "@testing-library/react";

import CustomInputBase from "../../../components/input/custom-input-base";
import GlobalTheme from "../../../components/global-theme";
import { ThemeProvider } from "@mui/material";

test("should render the input base", () => {
  render(
    <ThemeProvider theme={GlobalTheme()}>
      <CustomInputBase />
    </ThemeProvider>
  );
  const input = screen.getByRole("textbox");
  fireEvent.change(input, { target: { value: "Text Change" } });
  expect(input.value).toBe("Text Change");
});

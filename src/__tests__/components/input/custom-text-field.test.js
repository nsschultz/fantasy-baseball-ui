import { fireEvent, render, screen } from "@testing-library/react";

import CustomTextField from "../../../components/input/custom-text-field";
import GlobalTheme from "../../../components/global-theme";
import { ThemeProvider } from "@mui/material";

test("should render the text field", () => {
  render(
    <ThemeProvider theme={GlobalTheme()}>
      <CustomTextField />
    </ThemeProvider>
  );
  const input = screen.getByRole("textbox");
  fireEvent.change(input, { target: { value: "Text Change" } });
  expect(input.value).toBe("Text Change");
});

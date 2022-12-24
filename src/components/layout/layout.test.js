import { fireEvent, render, screen } from "@testing-library/react";

import GlobalTheme from "../global-theme";
import Layout from "./layout";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";

const TestWrapper = ({ isLoggedIn }) => (
  <ThemeProvider theme={GlobalTheme()}>
    <MemoryRouter initialEntries={["/home"]}>
      <Layout isLoggedIn={isLoggedIn} />
    </MemoryRouter>
  </ThemeProvider>
);

describe("Layout", () => {
  describe("should render", () => {
    test("when logged in", () => {
      render(<TestWrapper isLoggedIn={true} />);
      expect(screen.getByTestId("layout-titlebar")).toBeVisible();
      fireEvent.click(screen.getByTestId("titlebar-mobile-menu"));
      expect(screen.getByTestId("layout-sidebar")).toBeVisible();
    });
    test("when not logged in", () => {
      render(<TestWrapper isLoggedIn={false} />);
      expect(screen.getByTestId("layout-titlebar")).toBeVisible();
      expect(screen.queryByTestId("layout-sidebar")).toBeFalsy();
    });
  });
});

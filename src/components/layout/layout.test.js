import { fireEvent, render, screen } from "@testing-library/react";

import GlobalTheme from "../global-theme";
import Layout from "./layout";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";

describe("Layout", () => {
  describe("should render", () => {
    xtest("when logged in", () => {
      render(
        <ThemeProvider theme={GlobalTheme()}>
          <MemoryRouter initialEntries={["/home"]}>
            <Layout isLoggedIn={true} />
          </MemoryRouter>
        </ThemeProvider>
      );
      expect(screen.getByTestId("layout-titlebar")).toBeVisible();
      fireEvent.click(screen.getByTestId("titlebar-mobile-menu"));
      expect(screen.getByTestId("layout-sidebar")).toBeVisible();
    });
    xtest("when not logged in", () => {
      render(
        <ThemeProvider theme={GlobalTheme()}>
          <MemoryRouter initialEntries={["/home"]}>
            <Layout isLoggedIn={false} />
          </MemoryRouter>
        </ThemeProvider>
      );
      expect(screen.getByTestId("layout-titlebar")).toBeVisible();
      expect(screen.queryByTestId("layout-sidebar")).toBeFalsy();
    });
  });
});

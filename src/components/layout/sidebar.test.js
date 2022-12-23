import { render, screen } from "@testing-library/react";

import GlobalTheme from "../global-theme";
import { MemoryRouter } from "react-router-dom";
import Sidebar from "./sidebar";
import { ThemeProvider } from "@mui/material";

describe("Sidebar", () => {
  describe("should render", () => {
    xtest("with mobile", () => {
      render(
        <ThemeProvider theme={GlobalTheme()}>
          <MemoryRouter initialEntries={["/home"]}>
            <Sidebar onMobileClose={() => {}} openMobile={true} />
          </MemoryRouter>
        </ThemeProvider>
      );
      expect(screen.getByTestId("sidebar-desktop-drawer")).toBeVisible();
      expect(screen.getByTestId("sidebar-mobile-drawer")).toBeVisible();
    });
    xtest("without mobile", () => {
      render(
        <ThemeProvider theme={GlobalTheme()}>
          <MemoryRouter initialEntries={["/home"]}>
            <Sidebar onMobileClose={() => {}} openMobile={false} />
          </MemoryRouter>
        </ThemeProvider>
      );
      expect(screen.getByTestId("sidebar-desktop-drawer")).toBeVisible();
      expect(screen.queryByTestId("sidebar-mobile-drawer")).toBeFalsy();
    });
  });
});

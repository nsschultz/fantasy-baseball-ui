import { render, screen } from "@testing-library/react";

import GlobalTheme from "../global-theme";
import { MemoryRouter } from "react-router-dom";
import NavigationItem from "./navigation-item";
import { People } from "@mui/icons-material";
import { ThemeProvider } from "@mui/material";

describe("NavigationItem", () => {
  describe("should render", () => {
    xtest("with active link", () => {
      render(
        <ThemeProvider theme={GlobalTheme()}>
          <MemoryRouter initialEntries={["/home"]}>
            <NavigationItem href="/othersite" title="Test Title" icon={People} />
          </MemoryRouter>
        </ThemeProvider>
      );
      expect(screen.getByText("Test Title")).toBeVisible();
      expect(screen.getByTestId("PeopleIcon")).toBeTruthy();
      expect(screen.getByRole("link")).toHaveProperty("href", "http://localhost/othersite");
    });
    xtest("with non-active link", () => {
      render(
        <ThemeProvider theme={GlobalTheme()}>
          <MemoryRouter initialEntries={["/home"]}>
            <NavigationItem href="/home" title="Test Title" icon={People} />
          </MemoryRouter>
        </ThemeProvider>
      );
      expect(screen.getByText("Test Title")).toBeVisible();
      expect(screen.getByTestId("PeopleIcon")).toBeTruthy();
      expect(screen.getByRole("link")).toHaveProperty("href", "http://localhost/home");
    });
  });
});

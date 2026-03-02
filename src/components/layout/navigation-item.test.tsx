import { render, screen } from "@testing-library/react";

import GlobalTheme from "../../global-theme";
import { MemoryRouter } from "react-router-dom";
import NavigationItem from "./navigation-item";
import { People } from "@mui/icons-material";
import PropTypes from "prop-types";
import { ThemeProvider } from "@mui/material";

const TestWrapper = ({ href }) => (
  <ThemeProvider theme={GlobalTheme()}>
    <MemoryRouter initialEntries={["/home"]}>
      <NavigationItem href={href} title="Test Title" icon={People} />
    </MemoryRouter>
  </ThemeProvider>
);

TestWrapper.propTypes = {
  href: PropTypes.string.isRequired,
};

describe("NavigationItem", () => {
  describe("should render", () => {
    test("with active link", () => {
      render(<TestWrapper href="/othersite" />);
      expect(screen.getByText("Test Title")).toBeVisible();
      expect(screen.getByTestId("PeopleIcon")).toBeTruthy();
      expect(screen.getByRole("link")).toHaveProperty("href", "http://localhost/othersite");
    });
    test("with non-active link", () => {
      render(<TestWrapper href="/home" />);
      expect(screen.getByText("Test Title")).toBeVisible();
      expect(screen.getByTestId("PeopleIcon")).toBeTruthy();
      expect(screen.getByRole("link")).toHaveProperty("href", "http://localhost/home");
    });
  });
});

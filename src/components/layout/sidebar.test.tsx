import { render, screen } from "@testing-library/react";

import GlobalTheme from "../../global-theme";
import { MemoryRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Sidebar from "./sidebar";
import { ThemeProvider } from "@mui/material";

const TestWrapper = ({ openMobile }) => (
  <ThemeProvider theme={GlobalTheme()}>
    <MemoryRouter initialEntries={["/home"]}>
      <Sidebar onMobileClose={() => undefined} openMobile={openMobile} />
    </MemoryRouter>
  </ThemeProvider>
);

TestWrapper.propTypes = {
  openMobile: PropTypes.bool,
};

describe("Sidebar", () => {
  describe("should render", () => {
    test("with mobile", () => {
      render(<TestWrapper openMobile={true} />);
      expect(screen.getByTestId("sidebar-desktop-drawer")).toBeVisible();
      expect(screen.getByTestId("sidebar-mobile-drawer")).toBeVisible();
    });
    test("without mobile", () => {
      render(<TestWrapper openMobile={false} />);
      expect(screen.getByTestId("sidebar-desktop-drawer")).toBeVisible();
      expect(screen.queryByTestId("sidebar-mobile-drawer")).toBeFalsy();
    });
  });
});

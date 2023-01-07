import { render, screen } from "@testing-library/react";

import GlobalTheme from "../../global-theme";
import { MemoryRouter } from "react-router-dom";
import Sidebar from "./sidebar";
import { ThemeProvider } from "@mui/material";

const TestWrapper = ({ openMobile }) => (
  <ThemeProvider theme={GlobalTheme()}>
    <MemoryRouter initialEntries={["/home"]}>
      <Sidebar onMobileClose={() => {}} openMobile={openMobile} />
    </MemoryRouter>
  </ThemeProvider>
);

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

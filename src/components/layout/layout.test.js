import { fireEvent, render, screen } from "@testing-library/react";

import GlobalTheme from "../../global-theme";
import Layout from "./layout";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material";
import store from "../../state/store";

const TestWrapper = ({ isLoggedIn }) => (
  <Provider store={store}>
    <ThemeProvider theme={GlobalTheme()}>
      <MemoryRouter initialEntries={["/home"]}>
        <Layout isLoggedIn={isLoggedIn} />
      </MemoryRouter>
    </ThemeProvider>
  </Provider>
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

import { render, screen } from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import Titlebar from "./titlebar";
import store from "../../state/store";

const TestWrapper = ({ isLoggedIn }) => (
  <Provider store={store}>
    <MemoryRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }} initialEntries={["/home"]}>
      <Titlebar isLoggedIn={isLoggedIn} onOpenMobileNavigation={() => console.log("Mobile Opened")} />
    </MemoryRouter>
  </Provider>
);

TestWrapper.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

describe("Titlebar", () => {
  describe("should render", () => {
    test("when logged in", () => {
      render(<TestWrapper isLoggedIn={true} />);
      expect(screen.getByTestId("notification")).toBeVisible();
      expect(screen.getByTestId("titlebar-logout")).toBeVisible();
      expect(screen.getByTestId("titlebar-mobile-menu")).toBeVisible();
    });
    test("when not logged in", () => {
      render(<TestWrapper isLoggedIn={false} />);
      expect(screen.queryByTestId("notification")).toBeFalsy();
      expect(screen.queryByTestId("titlebar-logout")).toBeFalsy();
      expect(screen.queryByTestId("titlebar-mobile-menu")).toBeVisible();
    });
  });
});

import { render, screen } from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";
import Titlebar from "./titlebar";

const TestWrapper = ({ isLoggedIn }) => (
  <MemoryRouter initialEntries={["/home"]}>
    <Titlebar isLoggedIn={isLoggedIn} onOpenMobileNavigation={() => console.log("Mobile Opened")} />
  </MemoryRouter>
);

describe("Titlebar", () => {
  describe("should render", () => {
    test("when logged in", () => {
      render(<TestWrapper isLoggedIn={true} />);
      expect(screen.getByTestId("titlebar-notifcation")).toBeVisible();
      expect(screen.getByTestId("titlebar-logout")).toBeVisible();
      expect(screen.getByTestId("titlebar-mobile-menu")).toBeVisible();
    });
    test("when not logged in", () => {
      render(<TestWrapper isLoggedIn={false} />);
      expect(screen.queryByTestId("titlebar-notifcation")).toBeFalsy();
      expect(screen.queryByTestId("titlebar-logout")).toBeFalsy();
      expect(screen.queryByTestId("titlebar-mobile-menu")).toBeVisible();
    });
  });
});

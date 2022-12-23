import { render, screen } from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";
import Titlebar from "./titlebar";

describe("Titlebar", () => {
  describe("should render", () => {
    xtest("when logged in", () => {
      render(
        <MemoryRouter initialEntries={["/home"]}>
          <Titlebar isLoggedIn={true} onOpenMobileNavigation={() => console.log("Mobile Opened")} />
        </MemoryRouter>
      );
      expect(screen.getByTestId("titlebar-notifcation")).toBeVisible();
      expect(screen.getByTestId("titlebar-logout")).toBeVisible();
      expect(screen.getByTestId("titlebar-mobile-menu")).toBeVisible();
    });
    xtest("when not logged in", () => {
      render(
        <MemoryRouter initialEntries={["/home"]}>
          <Titlebar isLoggedIn={false} onOpenMobileNavigation={() => console.log("Mobile Opened")} />
        </MemoryRouter>
      );
      expect(screen.queryByTestId("titlebar-notifcation")).toBeFalsy();
      expect(screen.queryByTestId("titlebar-logout")).toBeFalsy();
      expect(screen.queryByTestId("titlebar-mobile-menu")).toBeVisible();
    });
  });
});

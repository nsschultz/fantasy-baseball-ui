import { render, screen } from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";
import Titlebar from "../../../components/layout/titlebar";

test("should render when logged in", () => {
  render(
    <MemoryRouter initialEntries={["/home"]}>
      <Titlebar isLoggedIn={true} />
    </MemoryRouter>
  );
  expect(screen.getByTestId("titlebar-notifcation")).toBeVisible();
  expect(screen.getByTestId("titlebar-logout")).toBeVisible();
  expect(screen.getByTestId("titlebar-mobile-menu")).toBeVisible();
});

test("should render when not logged in", () => {
  render(
    <MemoryRouter initialEntries={["/home"]}>
      <Titlebar isLoggedIn={false} />
    </MemoryRouter>
  );
  expect(screen.queryByTestId("titlebar-notifcation")).toBeFalsy();
  expect(screen.queryByTestId("titlebar-logout")).toBeFalsy();
  expect(screen.queryByTestId("titlebar-mobile-menu")).toBeVisible();
});

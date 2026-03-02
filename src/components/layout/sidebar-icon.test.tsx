import { HomeIcon, IntegrationIcon, PlayerIcon } from "./sidebar-icon";
import { render, screen } from "@testing-library/react";

test("HomeIcon should render", () => {
  render(<HomeIcon />);
  expect(screen.getAllByTestId("home-icon")).toHaveLength(1);
});
test("IntegrationIcon should render", () => {
  render(<IntegrationIcon />);
  expect(screen.getAllByTestId("integration-icon")).toHaveLength(1);
});
test("PlayerIcon should render", () => {
  render(<PlayerIcon />);
  expect(screen.getAllByTestId("player-icon")).toHaveLength(1);
});

import { HomeIcon, IntegrationIcon, PlayerIcon } from "./sidebar-icon";
import { render, screen } from "@testing-library/react";

xtest("HomeIcon should render", () => {
  render(<HomeIcon />);
  expect(screen.getAllByTestId("home-icon")).toHaveLength(1);
});
xtest("IntegrationIcon should render", () => {
  render(<IntegrationIcon />);
  expect(screen.getAllByTestId("integration-icon")).toHaveLength(1);
});
xtest("PlayerIcon should render", () => {
  render(<PlayerIcon />);
  expect(screen.getAllByTestId("player-icon")).toHaveLength(1);
});

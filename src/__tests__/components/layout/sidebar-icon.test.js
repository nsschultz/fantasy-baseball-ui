import { HomeIcon, IntegrationIcon, PlayerIcon } from "../../../components/layout/sidebar-icon";
import { render, screen } from "@testing-library/react";

test("should render the HomeIcon", () => {
  render(<HomeIcon />);
  expect(screen.getAllByTestId("home-icon")).toHaveLength(1);
});

test("should render the IntegrationIcon", () => {
  render(<IntegrationIcon />);
  expect(screen.getAllByTestId("integration-icon")).toHaveLength(1);
});

test("should render the PlayerIcon", () => {
  render(<PlayerIcon />);
  expect(screen.getAllByTestId("player-icon")).toHaveLength(1);
});

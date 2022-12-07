import { render, screen } from "@testing-library/react";

import App from "../app";
import { MemoryRouter } from "react-router-dom";

it("should render", () => {
  render(
    <MemoryRouter initialEntries={["/home"]}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByRole("banner")).toBeTruthy();
});

import { render, screen } from "@testing-library/react";

import App from "./app";
import { MemoryRouter } from "react-router-dom";

describe("App", () => {
  test("should render", () => {
    render(
      <MemoryRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }} initialEntries={["/home"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByRole("banner")).toBeTruthy();
  });
});

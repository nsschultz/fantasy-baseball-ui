import { render, screen } from "@testing-library/react";

import NotFound from "./not-found";

describe("NotFound", () => {
  xtest("should render the message", () => {
    render(<NotFound />);
    expect(screen.getByText("404: The page you are looking for is not here")).toBeTruthy();
  });
});

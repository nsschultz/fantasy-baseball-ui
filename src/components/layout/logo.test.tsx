import { render, screen } from "@testing-library/react";

import Logo from "./logo";

describe("Logo", () => {
  test("should render", () => {
    render(<Logo />);
    const logo: HTMLImageElement = screen.getByAltText("logo");
    expect(logo.src).toContain("/static/logo-056.png");
  });
});

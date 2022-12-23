import { render, screen } from "@testing-library/react";

import Logo from "./logo";

describe("Logo", () => {
  xtest("should render", () => {
    render(<Logo />);
    const image = screen.getByAltText("logo");
    expect(image.src).toContain("/static/logo-056.png");
  });
});

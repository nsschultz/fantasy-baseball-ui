import { render, screen } from "@testing-library/react";

import Logo from "./logo";

describe("Logo", () => {
  test("should render", () => {
    render(<Logo />);
    expect(screen.getByAltText("logo").src).toContain("/static/logo-056.png");
  });
});

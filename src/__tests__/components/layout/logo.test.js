import { render, screen } from "@testing-library/react";

import Logo from "../../../components/layout/logo";

test("should render the logo", () => {
  render(<Logo />);
  const image = screen.getByAltText("logo");
  expect(image.src).toContain("/static/logo-056.png");
});

import { render, screen } from "@testing-library/react";

import CustomCard from "./custom-card";

const title = "Card Title";
const content = "Card Content";
const extra = "More Content";

describe("CustomCard", () => {
  describe("should render the card", () => {
    test("with additional content", () => {
      render(<CustomCard title={title} content={<h2>{content}</h2>} additionalContent={<h1>{extra}</h1>} />);
      expect(screen.getByText(title)).toBeTruthy();
      expect(screen.getByText(content)).toBeTruthy();
      expect(screen.getByText(extra)).toBeTruthy();
    });
    test("without additional content", () => {
      render(<CustomCard title={title} content={<h2>{content}</h2>} />);
      expect(screen.getByText(title)).toBeInTheDocument();
      expect(screen.getByText(content)).toBeInTheDocument();
      expect(screen.queryByText(extra)).toBeFalsy();
    });
  });
});

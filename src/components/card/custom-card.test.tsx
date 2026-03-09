import { render, screen } from "@testing-library/react";

import CustomCard from "./custom-card";
import { CustomCardProps } from "../../types/component-types";

describe("CustomCard", () => {
  describe("should render the card", () => {
    test("with additional content", () => {
      const props: CustomCardProps = { additionalContent: <h1>More Content</h1>, content: <h2>Card Content</h2>, title: "Card Title" };
      render(<CustomCard {...props} />);
      expect(screen.getByText("Card Title")).toBeTruthy();
      expect(screen.getByText("Card Content")).toBeTruthy();
      expect(screen.getByText("More Content")).toBeTruthy();
    });
    test("without additional content", () => {
      const props: CustomCardProps = { content: <h2>Card Content</h2>, title: "Card Title" };
      render(<CustomCard {...props} />);
      expect(screen.getByText("Card Title")).toBeInTheDocument();
      expect(screen.getByText("Card Content")).toBeInTheDocument();
      expect(screen.queryByText("More Content")).toBeFalsy();
    });
  });
});

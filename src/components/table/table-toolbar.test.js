import { render, screen } from "@testing-library/react";

import TableToolbar from "./table-toolbar";

const TestWrapper = ({ title }) => <TableToolbar title={title} />;

describe("TableToolbar", () => {
  test("should render", () => {
    render(<TestWrapper title="MyTitle" />);
    expect(screen.getByText("MyTitle")).toBeVisible();
  });
});

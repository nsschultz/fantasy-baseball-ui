import { fireEvent, render, screen } from "@testing-library/react";

import GlobalTheme from "../global-theme";
import TableFilter from "./table-filter";
import { ThemeProvider } from "@mui/material";

const field = "OldField";
let existingValue = "Old";

const buildFilterHandler = () => {
  return (f, v) => {
    expect(f).toEqual(field);
    existingValue = v;
  };
};

const TestWrapper = ({ column }) => (
  <ThemeProvider theme={GlobalTheme()}>
    <TableFilter column={column} handleFilterChange={buildFilterHandler()} />
  </ThemeProvider>
);

describe("TableFilter", () => {
  describe("should render", () => {
    test("as a select field", () => {
      render(<TestWrapper column={{ field: field, title: "SelectTitle", lookup: { 0: "Available", 1: "Rostered", 2: "Unavailable", 3: "Scouted" } }} />);
      expect(screen.getByRole("button")).toBeVisible();
    });
    test("as a text field with a numeric value", () => {
      render(<TestWrapper column={{ field: field, filterValue: "1", type: "numeric" }} />);
      expect(screen.getByDisplayValue("1")).toBeVisible();
    });
    test("as a text field with a text value", () => {
      render(<TestWrapper column={{ field: field, filterValue: "TextValue" }} />);
      expect(screen.getByDisplayValue("TextValue")).toBeVisible();
    });
  });
  test("should handle a change event", () => {
    render(<TestWrapper column={{ field: field, width: 125 }} />);
    expect(existingValue).toEqual("Old");
    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "New" } });
    expect(existingValue).toEqual("New");
  });
});

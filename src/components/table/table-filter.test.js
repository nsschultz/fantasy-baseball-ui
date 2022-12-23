import { fireEvent, render, screen } from "@testing-library/react";

import GlobalTheme from "../global-theme";
import TableFilter from "./table-filter";
import { ThemeProvider } from "@mui/material";

const existingField = "OldField";
let existingValue = "Old";

const buildFilterHandler = () => {
  return (field, value) => {
    expect(field).toEqual(existingField);
    existingValue = value;
  };
};
const renderFilter = (column) =>
  render(
    <ThemeProvider theme={GlobalTheme()}>
      <ThemeProvider theme={GlobalTheme()}>
        <TableFilter column={column} handleFilterChange={buildFilterHandler()} />
      </ThemeProvider>
    </ThemeProvider>
  );

describe("TableFilter", () => {
  describe("should render", () => {
    xtest("as a select field", () => {
      renderFilter({ title: "SelectTitle", lookup: { 0: "Available", 1: "Rostered", 2: "Unavailable", 3: "Scouted" } });
      expect(screen.getByRole("button")).toBeVisible();
    });
    xtest("as a text field with a numeric value", () => {
      renderFilter({ filterValue: "1", type: "numeric" });
      expect(screen.getByDisplayValue("1")).toBeVisible();
    });
    xtest("as a text field with a text value", () => {
      renderFilter({ filterValue: "TextValue" });
      expect(screen.getByDisplayValue("TextValue")).toBeVisible();
    });
  });
  xtest("should handle a change event", () => {
    renderFilter({ field: existingField, width: 125 });
    expect(existingValue).toEqual("Old");
    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "New" } });
    expect(existingValue).toEqual("New");
  });
});

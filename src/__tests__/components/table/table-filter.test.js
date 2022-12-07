import { fireEvent, render, screen } from "@testing-library/react";

import GlobalTheme from "../../../components/global-theme";
import TableFilter from "../../../components/table/table-filter";
import { ThemeProvider } from "@mui/material";

test("should render as a select field", () => {
  const column = { title: "SelectTitle", lookup: { 0: "Available", 1: "Rostered", 2: "Unavailable", 3: "Scouted" } };
  render(
    <ThemeProvider theme={GlobalTheme()}>
      <TableFilter column={column} />
    </ThemeProvider>
  );
  expect(screen.getByRole("button")).toBeVisible();
});

test("should render as a text field with a numeric value", () => {
  const column = { filterValue: "1", type: "numeric" };
  render(
    <ThemeProvider theme={GlobalTheme()}>
      <TableFilter column={column} />
    </ThemeProvider>
  );
  expect(screen.getByDisplayValue("1")).toBeVisible();
});

test("should render as a text field with a text value", () => {
  const column = { filterValue: "TextValue" };
  render(
    <ThemeProvider theme={GlobalTheme()}>
      <TableFilter column={column} />
    </ThemeProvider>
  );
  expect(screen.getByDisplayValue("TextValue")).toBeVisible();
});

test("should handle a change event", () => {
  let existingField = "OldField";
  let existingValue = "Old";
  const onHandleFilterChange = (field, value) => {
    expect(field).toEqual(existingField);
    existingValue = value;
  };
  const column = { field: existingField, width: 125 };
  render(
    <ThemeProvider theme={GlobalTheme()}>
      <TableFilter column={column} onHandleFilterChange={onHandleFilterChange} />
    </ThemeProvider>
  );
  expect(existingValue).toEqual("Old");
  fireEvent.change(screen.getByRole("searchbox"), { target: { value: "New" } });
  expect(existingValue).toEqual("New");
});

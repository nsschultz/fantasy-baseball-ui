import { fireEvent, render, screen } from "@testing-library/react";

import CustomTableRow from "../../../components/table/custom-table-row";
import GlobalTheme from "../../../components/global-theme";
import { ThemeProvider } from "@mui/material";

const columns = [
  { title: "Name", field: "name" },
  { title: "Age", field: "age", type: "numeric" },
  { title: "Type", field: "type", lookup: { 0: "", 1: "Batter", 2: "Pitcher" } },
  { title: "Drafted %", field: "draftedPercentage", type: "numeric", format: (value) => value.toFixed(2) },
];

const values = { id: 10, name: "Schultz, Nick", age: 40, type: 1, draftedPercentage: 0 };

test("should render basic row", () => {
  render(<CustomTableRow columns={columns} values={values} />);
  expect(screen.getAllByRole("cell")).toHaveLength(columns.length);
});

test("should render with edit button", () => {
  let editData = {};
  expect(editData).toEqual({});
  render(<CustomTableRow columns={columns} handleEditOpen={(v) => (editData = v)} values={values} />);
  expect(screen.getAllByRole("cell")).toHaveLength(columns.length + 1);
  fireEvent.click(screen.getByRole("button"));
  expect(editData).toEqual(values);
});

test("should render with child table", () => {
  render(
    <ThemeProvider theme={GlobalTheme()}>
      <CustomTableRow childColumns={columns} childRows={[values]} childTitle="Child Title" columns={columns} values={values} />
    </ThemeProvider>
  );
  expect(screen.queryByText("Child Title")).toBeFalsy();
  fireEvent.click(screen.getByRole("button"));
  expect(screen.getByText("Child Title")).toBeVisible();
});

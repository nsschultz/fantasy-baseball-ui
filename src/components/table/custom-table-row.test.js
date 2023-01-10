import { fireEvent, render, screen } from "@testing-library/react";

import CustomTableRow from "./custom-table-row";
import GlobalTheme from "../../global-theme";
import { ThemeProvider } from "@mui/material";

const columns = [
  { field: "name", title: "Name" },
  { align: "right", field: "age", title: "Age" },
  { field: "type", lookup: { 0: "", 1: "Batter", 2: "Pitcher" }, title: "Type" },
  { align: "right", field: "draftedPercentage", format: (value) => value.toFixed(2), title: "Drafted %" },
];
const values = { id: 10, name: "Schultz, Nick", age: 40, type: 1, draftedPercentage: 0 };

const TestWrapper = ({ childProps, handleEditOpen }) => (
  <ThemeProvider theme={GlobalTheme()}>
    <table>
      <tbody>
        <CustomTableRow childProps={childProps} columns={columns} handleEditOpen={handleEditOpen} values={values} />
      </tbody>
    </table>
  </ThemeProvider>
);

describe("CustomTableRow", () => {
  describe("should render", () => {
    test("basic row", () => {
      render(<TestWrapper />);
      expect(screen.getAllByRole("cell")).toHaveLength(columns.length);
    });
    test("with edit button", () => {
      let editData = {};
      expect(editData).toEqual({});
      render(<TestWrapper handleEditOpen={(v) => (editData = v)} />);
      expect(screen.getAllByRole("cell")).toHaveLength(columns.length + 1);
      fireEvent.click(screen.getByRole("button"));
      expect(editData).toEqual(values);
    });
    test("with child table", () => {
      render(<TestWrapper childProps={{ columns: columns, rowKeyBuilder: (row) => row.id, rows: [values], title: "Child Title" }} />);
      expect(screen.queryByText("Child Title")).toBeFalsy();
      fireEvent.click(screen.getByRole("button"));
      expect(screen.getByText("Child Title")).toBeVisible();
    });
  });
});

import { fireEvent, render, screen } from "@testing-library/react";

import CustomTableRow from "./custom-table-row";
import GlobalTheme from "../../global-theme";
import { ThemeProvider } from "@mui/material";

const columns = [
  { field: "name", title: "Name" },
  { align: "right", field: "averageDraftPick", format: (value) => value.toFixed(2), title: "ADP" },
];
const values = { id: 10, name: "Schultz, Nick", age: 40, type: 1, averageDraftPick: 0 };

const TestWrapper = ({ childProps, handleDeleteOpen, handleEditOpen }) => (
  <ThemeProvider theme={GlobalTheme()}>
    <table>
      <tbody>
        <CustomTableRow childProps={childProps} columns={columns} handleDeleteOpen={handleDeleteOpen} handleEditOpen={handleEditOpen} values={values} />
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
    test("with delete button", () => {
      let deleteData = {};
      expect(deleteData).toEqual({});
      render(<TestWrapper handleDeleteOpen={(v) => (deleteData = v)} />);
      expect(screen.getAllByRole("cell")).toHaveLength(columns.length + 1);
      fireEvent.click(screen.getByRole("button"));
      expect(deleteData).toEqual(values);
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
      render(
        <TestWrapper childProps={{ columns: columns, description: "MyDescription", rowKeyBuilder: (row) => row.id, rows: [values], title: "Child Title" }} />
      );
      expect(screen.queryByText("Child Title")).toBeFalsy();
      fireEvent.click(screen.getByRole("button"));
      expect(screen.getByText("Child Title")).toBeVisible();
    });
  });
});

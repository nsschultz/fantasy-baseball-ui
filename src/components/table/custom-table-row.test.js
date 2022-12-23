import { fireEvent, render, screen } from "@testing-library/react";

import CustomTableRow from "./custom-table-row";
import GlobalTheme from "../global-theme";
import { ThemeProvider } from "@mui/material";

const columns = [
  { title: "Name", field: "name" },
  { title: "Age", field: "age", type: "numeric" },
  { title: "Type", field: "type", lookup: { 0: "", 1: "Batter", 2: "Pitcher" } },
  { title: "Drafted %", field: "draftedPercentage", type: "numeric", format: (value) => value.toFixed(2) },
];
const values = { id: 10, name: "Schultz, Nick", age: 40, type: 1, draftedPercentage: 0 };

describe("CustomTableRow", () => {
  describe("should render", () => {
    xtest("basic row", () => {
      render(<CustomTableRow columns={columns} values={values} />);
      expect(screen.getAllByRole("cell")).toHaveLength(columns.length);
    });
    xtest("with edit button", () => {
      let editData = {};
      expect(editData).toEqual({});
      render(<CustomTableRow columns={columns} handleEditOpen={(v) => (editData = v)} values={values} />);
      expect(screen.getAllByRole("cell")).toHaveLength(columns.length + 1);
      fireEvent.click(screen.getByRole("button"));
      expect(editData).toEqual(values);
    });
    xtest("with child table", () => {
      render(
        <ThemeProvider theme={GlobalTheme()}>
          <CustomTableRow childProps={{ columns: columns, rows: [values], title: "Child Title" }} columns={columns} values={values} />
        </ThemeProvider>
      );
      expect(screen.queryByText("Child Title")).toBeFalsy();
      fireEvent.click(screen.getByRole("button"));
      expect(screen.getByText("Child Title")).toBeVisible();
    });
  });
});

import { fireEvent, render, screen } from "@testing-library/react";

import GlobalTheme from "../../global-theme";
import ParentTable from "./parent-table";
import { ThemeProvider } from "@mui/material";

let columns;
let editCount = 0;
const defaultRowDisplay = 10;
const playerTypes = { 0: "", 1: "Batter", 2: "Pitcher" };
let returnRow = false;
const rows = [
  { id: 10, name: "Schultz, Nick", age: 40, team: { code: "TB" }, type: 1, draftedPercentage: 0 },
  { id: 11, name: "Schultz, Annie", age: 36, team: { code: "SF" }, type: 0, draftedPercentage: 0.5 },
  { id: 12, name: "Schultz, James", age: 10, team: { code: "MIL" }, type: 2, draftedPercentage: 1 },
  { id: 13, name: "Schultz, Samantha", age: 7, team: { code: "MIL" }, type: 0, draftedPercentage: 0.99 },
  { id: 14, name: "Braun, Ryan", age: 37, team: { code: "MIL" }, type: 1, draftedPercentage: 0.08 },
  { id: 15, name: "Yount, Robin", age: 65, team: { code: "MIL" }, type: 1, draftedPercentage: 0.19 },
  { id: 16, name: "Molitor, Paul", age: 64, team: { code: "MIL" }, type: 1, draftedPercentage: 0.04 },
  { id: 17, name: "Fingers, Rollie", age: 74, team: { code: "MIL" }, type: 2, draftedPercentage: 0.34 },
  { id: 18, name: "Aaron, Hank", age: 86, team: { code: "MIL" }, type: 1, draftedPercentage: 0.44 },
  { id: 19, name: "Sheets, Ben", age: 43, team: { code: "MIL" }, type: 2, draftedPercentage: 0.15 },
  { id: 20, name: "Wickman, Bob", age: 52, team: { code: "MIL" }, type: 2, draftedPercentage: 0.27 },
];
let saveCount = 0;
const teams = { MIL: "BREWERS", SF: "GIANTS", TB: "RAYS" };

const buildEdit = (handleEditClose, editOpen, editRow) => {
  editCount++;
  expect(editOpen).toEqual(true);
  expect(editRow).toEqual(rows[0]);
  handleEditClose(returnRow ? editRow : undefined);
};
const handleClose = (editRow) => {
  if (editRow) {
    expect(editRow).toEqual(rows[0]);
    saveCount++;
  }
  return rows;
};

beforeEach(
  () =>
    (columns = [
      { field: "name", title: "Name" },
      { align: "right", field: "age", title: "Age" },
      { field: "team", format: (value) => teams[value], title: "Team" },
      { field: "type", format: (value) => playerTypes[value], title: "Type" },
      { align: "right", field: "draftedPercentage", format: (value) => value.toFixed(2), title: "Drafted %" },
    ])
);
beforeEach(() => (saveCount = 0));
beforeEach(() => (editCount = 0));
beforeEach(() => (returnRow = false));

const TestWrapper = ({ childProps, editProps, toolbarProps }) => (
  <ThemeProvider theme={GlobalTheme()}>
    <ParentTable childProps={childProps} columns={columns} editProps={editProps} toolbarProps={toolbarProps} values={rows} />
  </ThemeProvider>
);

describe("ParentTable", () => {
  describe("should render", () => {
    test("with the default number of rows visible", () => {
      render(<TestWrapper />);
      expect(screen.getAllByRole("columnheader")).toHaveLength(columns.length + 1);
      expect(screen.getAllByRole("row")).toHaveLength(defaultRowDisplay + 1);
    });
    test("with the toolbar visible", () => {
      render(<TestWrapper toolbarProps={{ title: "MyTitle" }} />);
      expect(screen.getByText("MyTitle")).toBeVisible();
    });
    test("and handle moving to the next page and back", () => {
      render(<TestWrapper />);
      expect(screen.getAllByRole("row")).toHaveLength(defaultRowDisplay + 1);
      fireEvent.click(screen.getByLabelText("Go to next page"));
      expect(screen.getAllByRole("row")).toHaveLength(2);
      fireEvent.click(screen.getByLabelText("Go to previous page"));
      expect(screen.getAllByRole("row")).toHaveLength(defaultRowDisplay + 1);
    });
    test("and handle changing the page size", () => {
      render(<TestWrapper />);
      expect(screen.getAllByRole("row")).toHaveLength(defaultRowDisplay + 1);
      fireEvent.mouseDown(screen.getByRole("button", { name: "Rows per page: 10" }));
      fireEvent.click(screen.getByText("25"));
      expect(screen.getAllByRole("row")).toHaveLength(rows.length + 1);
    });
  });
  describe("should sort in", () => {
    test("ascending order", () => {
      render(<TestWrapper />);
      fireEvent.click(screen.getByText("Name"));
      expect(screen.getAllByRole("row")[1]).toHaveTextContent("Aaron, Hank");
      expect(screen.getAllByRole("row")[10]).toHaveTextContent("Wickman, Bob");
    });
    test("descending order", () => {
      render(<TestWrapper />);
      fireEvent.click(screen.getByText("Name"));
      fireEvent.click(screen.getByText("Name"));
      expect(screen.getAllByRole("row")[1]).toHaveTextContent("Yount, Robin");
      expect(screen.getAllByRole("row")[10]).toHaveTextContent("Braun, Ryan");
    });
  });
  describe("should handle editing", () => {
    test("and cancelling the changes", () => {
      render(<TestWrapper editProps={{ buildWindow: buildEdit, handleClose: handleClose }} />);
      fireEvent.click(screen.getByTestId("row-edit-10"));
      expect(saveCount).toEqual(0);
      expect(editCount).toEqual(1);
    });
    test("and saving the changes", () => {
      returnRow = true;
      render(<TestWrapper editProps={{ buildWindow: buildEdit, handleClose: handleClose }} />);
      fireEvent.click(screen.getByTestId("row-edit-10"));
      expect(saveCount).toEqual(1);
      expect(editCount).toEqual(1);
    });
  });
  test("should handle displaying a child table", () => {
    render(<TestWrapper childProps={{ columnSelector: () => columns, rowKeyBuilder: (row) => row.id, rowSelector: () => rows, title: "Child Title" }} />);
    expect(screen.queryByText("Child Title")).toBeFalsy();
    fireEvent.click(screen.getByTestId("row-expand-10"));
    expect(screen.getByText("Child Title")).toBeVisible();
  });
});

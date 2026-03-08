import { ChildRowProps, DialogProps, ParentTableProps, RowValue, TableColumnProps, TableToolbarProps } from "../../types/table-types";
import { defaultObjectComparator, playerNameComparator } from "../../funcs/sort-comparators";
import { fireEvent, render, screen } from "@testing-library/react";

import GlobalTheme from "../../global-theme";
import ParentTable from "./parent-table";
import { ThemeProvider } from "@mui/material";

let columns: readonly TableColumnProps<RowValue>[];
let deleteCount = 0;
let editCount = 0;
const defaultRowDisplay = 10;
const playerTypes = { 0: "", 1: "Batter", 2: "Pitcher" };
const values: RowValue[] = [
  { id: 10, firstName: "Nick", lastName: "Schultz", name: "Schultz, Nick", age: 40, team: { code: "TB" }, type: 1, averageDraftPick: 0 },
  { id: 11, firstName: "Annie", lastName: "Schultz", name: "Schultz, Annie", age: 36, team: { code: "SF" }, type: 0, averageDraftPick: 0 },
  { id: 12, firstName: "James", lastName: "Schultz", name: "Schultz, James", age: 10, team: { code: "MIL" }, type: 2, averageDraftPick: 1 },
  { id: 13, firstName: "Samantha", lastName: "Schultz", name: "Schultz, Samantha", age: 7, team: { code: "MIL" }, type: 0, averageDraftPick: 0.99 },
  { id: 14, firstName: "Ryan", lastName: "Braun", name: "Braun, Ryan", age: 37, team: { code: "MIL" }, type: 1, averageDraftPick: 0.08 },
  { id: 15, firstName: "Robin", lastName: "Yount", name: "Yount, Robin", age: 65, team: { code: "MIL" }, type: 1, averageDraftPick: 0.19 },
  { id: 16, firstName: "Paul", lastName: "Molitor", name: "Molitor, Paul", age: 64, team: { code: "MIL" }, type: 1, averageDraftPick: 0.04 },
  { id: 17, firstName: "Rollie", lastName: "Fingers", name: "Fingers, Rollie", age: 74, team: { code: "MIL" }, type: 2, averageDraftPick: 0.34 },
  { id: 18, firstName: "Hank", lastName: "Aaron", name: "Aaron, Hank", age: 86, team: { code: "MIL" }, type: 1, averageDraftPick: 0.44 },
  { id: 19, firstName: "Ben", lastName: "Sheets", name: "Sheets, Ben", age: 43, team: { code: "MIL" }, type: 2, averageDraftPick: 0.15 },
  { id: 20, firstName: "Bob", lastName: "Wickman", name: "Wickman, Bob", age: 52, team: { code: "MIL" }, type: 2, averageDraftPick: 0.27 },
];
const sortComparator = (obj1, obj2) => defaultObjectComparator(obj1, obj2, "id");
const teams = { MIL: "BREWERS", SF: "GIANTS", TB: "RAYS" };

const buildDelete = (handleDeleteClose: (arg0: RowValue) => void, deleteOpen: boolean, deleteRow: RowValue) => {
  deleteCount++;
  expect(deleteOpen).toEqual(true);
  handleDeleteClose(deleteRow);
  return null;
};
const buildEdit = (handleEditClose: (arg0: RowValue) => void, editOpen: boolean, editRow: RowValue) => {
  editCount++;
  expect(editOpen).toEqual(true);
  handleEditClose(editRow);
  return null;
};
const handleDeleteClose = (row: RowValue) => expect(row).toEqual(values[1]);
const handleEditClose = (row: RowValue) => expect(row).toEqual(values[0]);

beforeEach(
  () =>
    (columns = [
      { field: "name", sortComparator: playerNameComparator, title: "Name" },
      { align: "right", field: "age", title: "Age" },
      { field: "team", format: (value: string) => teams[value], title: "Team" },
      { field: "type", format: (value: string) => playerTypes[value], title: "Type" },
      { align: "right", field: "averageDraftPick", format: (value: number) => value.toFixed(2), title: "ADP" },
    ])
);
beforeEach(() => (deleteCount = 0));
beforeEach(() => (editCount = 0));

const TestWrapper = (props: ParentTableProps<RowValue>) => (
  <ThemeProvider theme={GlobalTheme()}>
    <ParentTable {...props} />
  </ThemeProvider>
);

describe("ParentTable", () => {
  describe("should render", () => {
    test("with the default number of rows visible", () => {
      render(<TestWrapper columns={columns} description={"TheTable"} values={values} sortComparator={sortComparator} />);
      expect(screen.getAllByRole("columnheader")).toHaveLength(columns.length + 1);
      expect(screen.getAllByRole("row")).toHaveLength(defaultRowDisplay + 1);
    });
    test("with the toolbar visible", () => {
      const toolbarProps: TableToolbarProps<RowValue> = { description: "MyDescription", title: "MyTitle" };
      render(<TestWrapper columns={columns} description={"TheTable"} values={values} sortComparator={sortComparator} toolbarProps={toolbarProps} />);
      expect(screen.getByText("MyTitle")).toBeVisible();
    });
    test("and handle moving to the next page and back", () => {
      render(<TestWrapper columns={columns} description={"TheTable"} values={values} sortComparator={sortComparator} />);
      expect(screen.getAllByRole("row")).toHaveLength(defaultRowDisplay + 1);
      fireEvent.click(screen.getByLabelText("Go to next page"));
      expect(screen.getAllByRole("row")).toHaveLength(2);
      fireEvent.click(screen.getByLabelText("Go to previous page"));
      expect(screen.getAllByRole("row")).toHaveLength(defaultRowDisplay + 1);
    });
    test("and handle changing the page size", () => {
      render(<TestWrapper columns={columns} description={"TheTable"} values={values} sortComparator={sortComparator} />);
      expect(screen.getAllByRole("row")).toHaveLength(defaultRowDisplay + 1);
      fireEvent.mouseDown(screen.getByRole("combobox", { name: /Rows per page/i }));
      fireEvent.click(screen.getByText("25"));
      expect(screen.getAllByRole("row")).toHaveLength(values.length + 1);
    });
  });
  describe("should sort in", () => {
    test("ascending order", () => {
      render(<TestWrapper columns={columns} description={"TheTable"} values={values} sortComparator={sortComparator} />);
      fireEvent.click(screen.getByText("Name"));
      expect(screen.getAllByRole("row")[1]).toHaveTextContent("Aaron, Hank");
      expect(screen.getAllByRole("row")[10]).toHaveTextContent("Wickman, Bob");
    });
    test("descending order", () => {
      render(<TestWrapper columns={columns} description={"TheTable"} values={values} sortComparator={sortComparator} />);
      fireEvent.click(screen.getByText("Name"));
      fireEvent.click(screen.getByText("Name"));
      expect(screen.getAllByRole("row")[1]).toHaveTextContent("Yount, Robin");
      expect(screen.getAllByRole("row")[10]).toHaveTextContent("Braun, Ryan");
    });
    test("sort where there is a match", () => {
      render(<TestWrapper columns={columns} description={"TheTable"} values={values} sortComparator={sortComparator} />);
      fireEvent.click(screen.getByText("ADP"));
      expect(screen.getAllByRole("row")[1]).toHaveTextContent("Schultz, Nick");
      expect(screen.getAllByRole("row")[10]).toHaveTextContent("Schultz, Samantha");
    });
    test("sort by default", () => {
      render(<TestWrapper columns={columns} description={"TheTable"} values={values} sortComparator={sortComparator} />);
      fireEvent.click(screen.getByText("Actions"));
      fireEvent.click(screen.getByText("Actions"));
      expect(screen.getAllByRole("row")[1]).toHaveTextContent("Wickman, Bob");
      expect(screen.getAllByRole("row")[10]).toHaveTextContent("Schultz, Annie");
    });
  });
  test("should handle deleting", () => {
    const deleteProps: DialogProps<RowValue> = { buildDialog: buildDelete, handleClose: handleDeleteClose };
    render(<TestWrapper columns={columns} deleteProps={deleteProps} description={"TheTable"} values={values} sortComparator={sortComparator} />);
    fireEvent.click(screen.getByTestId("row-delete-11"));
    expect(deleteCount).toEqual(1);
    expect(editCount).toEqual(0);
  });
  test("should handle editing", () => {
    const editProps: DialogProps<RowValue> = { buildDialog: buildEdit, handleClose: handleEditClose };
    render(<TestWrapper columns={columns} editProps={editProps} description={"TheTable"} values={values} sortComparator={sortComparator} />);
    fireEvent.click(screen.getByTestId("row-edit-10"));
    expect(deleteCount).toEqual(0);
    expect(editCount).toEqual(1);
  });
  test("should handle displaying a child table", () => {
    const childProps: ChildRowProps<RowValue> = {
      columnSelector: () => columns,
      description: "MyDescription",
      rowKeyBuilder: (row: RowValue) => row.id,
      rowSelector: () => values,
      title: "Child Title",
    };
    render(<TestWrapper childProps={childProps} columns={columns} description={"TheTable"} values={values} sortComparator={sortComparator} />);
    expect(screen.queryByText("Child Title")).toBeFalsy();
    fireEvent.click(screen.getByTestId("row-expand-10"));
    expect(screen.getByText("Child Title")).toBeVisible();
  });
});

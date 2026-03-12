import { ChildRowProps, DialogProps, ParentTableProps, TableColumnProps, TableToolbarProps } from "../../types/component-types";
import { Player, Team } from "../../types/entity-types";
import { defaultObjectComparator, playerNameComparator } from "../../funcs/sort-comparators";
import { fireEvent, render, screen } from "@testing-library/react";

import GlobalTheme from "../../global-theme";
import ParentTable from "./parent-table";
import { ThemeProvider } from "@mui/material";

let columns: readonly TableColumnProps<Player>[];
let deleteCount = 0;
let editCount = 0;
const defaultRowDisplay = 10;
const playerBuilder = (id: string, firstName: string, lastName: string, age: number, team: Team, type: number, averageDraftPick: number): Player => ({
  id: id,
  mlbAmId: 0,
  type: type,
  firstName: firstName,
  lastName: lastName,
  name: `${lastName}, ${firstName}`,
  age: age,
  status: 0,
  averageDraftPick: averageDraftPick,
  averageDraftPickMin: 0,
  averageDraftPickMax: 0,
  reliability: 0,
  mayberryMethod: 0,
  league1: 0,
  league2: 0,
  battingStats: [],
  pitchingStats: [],
  team: team,
  positions: [],
});

const playerTypes = { 0: "", 1: "Batter", 2: "Pitcher" };
const team1: Team = { code: "MIL", alternativeCode: null, leagueId: "NL", city: "Milwaukee", nickname: "Brewers" };
const team2: Team = { code: "SF", alternativeCode: null, leagueId: "NL", city: "San Francisco", nickname: "Giants" };
const team3: Team = { code: "TB", alternativeCode: null, leagueId: "AL", city: "Tampa Bay", nickname: "Rays" };
const values: Player[] = [
  playerBuilder("10", "Nick", "Schultz", 40, team3, 1, 0),
  playerBuilder("11", "Annie", "Schultz", 36, team2, 0, 0),
  playerBuilder("12", "James", "Schultz", 10, team1, 2, 1),
  playerBuilder("13", "Samantha", "Schultz", 7, team1, 0, 0.99),
  playerBuilder("14", "Ryan", "Braun", 37, team1, 1, 0.08),
  playerBuilder("15", "Robin", "Yount", 65, team1, 1, 0.19),
  playerBuilder("16", "Paul", "Molitor", 64, team1, 1, 0.04),
  playerBuilder("17", "Rollie", "Fingers", 74, team1, 2, 0.34),
  playerBuilder("18", "Hank", "Aaron", 86, team1, 1, 0.44),
  playerBuilder("19", "Ben", "Sheets", 43, team1, 2, 0.15),
  playerBuilder("20", "Bob", "Wickman", 52, team1, 2, 0.27),
];
const sortComparator = (obj1: Player, obj2: Player) => defaultObjectComparator(obj1, obj2, "id");
const teams = { MIL: "BREWERS", SF: "GIANTS", TB: "RAYS" };

const buildDelete = (handleDeleteClose: (arg0: Player) => void, deleteOpen: boolean, deleteRow: Player) => {
  deleteCount++;
  expect(deleteOpen).toEqual(true);
  handleDeleteClose(deleteRow);
  return null;
};
const buildEdit = (handleEditClose: (arg0: Player) => void, editOpen: boolean, editRow: Player) => {
  editCount++;
  expect(editOpen).toEqual(true);
  handleEditClose(editRow);
  return null;
};
const handleDeleteClose = (row: Player) => expect(row).toEqual(values[1]);
const handleEditClose = (row: Player) => expect(row).toEqual(values[0]);

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

const TestWrapper = (props: ParentTableProps<Player>) => (
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
      const toolbarProps: TableToolbarProps<Player> = { description: "MyDescription", title: "MyTitle" };
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
    const deleteProps: DialogProps<Player> = { buildDialog: buildDelete, handleClose: handleDeleteClose };
    render(<TestWrapper columns={columns} deleteProps={deleteProps} description={"TheTable"} values={values} sortComparator={sortComparator} />);
    fireEvent.click(screen.getByTestId("row-delete-11"));
    expect(deleteCount).toEqual(1);
    expect(editCount).toEqual(0);
  });
  test("should handle editing", () => {
    const editProps: DialogProps<Player> = { buildDialog: buildEdit, handleClose: handleEditClose };
    render(<TestWrapper columns={columns} editProps={editProps} description={"TheTable"} values={values} sortComparator={sortComparator} />);
    fireEvent.click(screen.getByTestId("row-edit-10"));
    expect(deleteCount).toEqual(0);
    expect(editCount).toEqual(1);
  });
  test("should handle displaying a child table", () => {
    const childProps: ChildRowProps<Player> = {
      columnSelector: () => columns,
      description: "MyDescription",
      rowKeyBuilder: (row: Player) => row.id,
      rowSelector: () => values,
      title: "Child Title",
    };
    render(<TestWrapper childProps={childProps} columns={columns} description={"TheTable"} values={values} sortComparator={sortComparator} />);
    expect(screen.queryByText("Child Title")).toBeFalsy();
    fireEvent.click(screen.getByTestId("row-expand-10"));
    expect(screen.getByText("Child Title")).toBeVisible();
  });
});

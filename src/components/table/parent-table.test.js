import { fireEvent, render, screen } from "@testing-library/react";

import GlobalTheme from "../global-theme";
import ParentTable from "./parent-table";
import { ThemeProvider } from "@mui/material";

let columns;

const defaultRowDisplay = 10;
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

beforeEach(
  () =>
    (columns = [
      { title: "Name", field: "name" },
      { title: "Age", field: "age", type: "numeric" },
      {
        title: "Team",
        field: "team",
        lookup: { MIL: "BREWERS", SF: "GIANTS", TB: "RAYS" },
        filterMatcher: (filterValue, field) => filterValue.some((v) => v === field.code),
      },
      { title: "Type", field: "type", lookup: { 0: "", 1: "Batter", 2: "Pitcher" } },
      { title: "Drafted %", field: "draftedPercentage", type: "numeric", format: (value) => value.toFixed(2) },
    ])
);

describe("ParentTable", () => {
  describe("should render", () => {
    test("with the default number of rows visible", () => {
      render(
        <ThemeProvider theme={GlobalTheme()}>
          <ParentTable columns={columns} values={rows} />
        </ThemeProvider>
      );
      expect(screen.getAllByRole("columnheader")).toHaveLength(columns.length + 1);
      expect(screen.getAllByRole("row")).toHaveLength(defaultRowDisplay + 1);
    });
    test("and handle moving to the next page and back", () => {
      render(
        <ThemeProvider theme={GlobalTheme()}>
          <ParentTable columns={columns} values={rows} />
        </ThemeProvider>
      );
      expect(screen.getAllByRole("row")).toHaveLength(defaultRowDisplay + 1);
      fireEvent.click(screen.getByLabelText("Go to next page"));
      expect(screen.getAllByRole("row")).toHaveLength(2);
      fireEvent.click(screen.getByLabelText("Go to previous page"));
      expect(screen.getAllByRole("row")).toHaveLength(defaultRowDisplay + 1);
    });
    test("and handle changing the page size", async () => {
      render(
        <ThemeProvider theme={GlobalTheme()}>
          <ParentTable columns={columns} values={rows} />
        </ThemeProvider>
      );
      expect(screen.getAllByRole("row")).toHaveLength(defaultRowDisplay + 1);
      fireEvent.mouseDown(screen.getByRole("button", { name: "Rows per page: 10" }));
      fireEvent.click(await screen.findByText("25"));
      expect(screen.getAllByRole("row")).toHaveLength(rows.length + 1);
    });
  });
  describe("should sort in", () => {
    test("ascending order", () => {
      render(
        <ThemeProvider theme={GlobalTheme()}>
          <ParentTable columns={columns} values={rows} />
        </ThemeProvider>
      );
      fireEvent.click(screen.getByText("Name"));
      expect(screen.getAllByRole("row")[1]).toHaveTextContent("Aaron, Hank");
      expect(screen.getAllByRole("row")[10]).toHaveTextContent("Wickman, Bob");
    });
    test("descending order", () => {
      render(
        <ThemeProvider theme={GlobalTheme()}>
          <ParentTable columns={columns} values={rows} />
        </ThemeProvider>
      );
      fireEvent.click(screen.getByText("Name"));
      fireEvent.click(screen.getByText("Name"));
      expect(screen.getAllByRole("row")[1]).toHaveTextContent("Yount, Robin");
      expect(screen.getAllByRole("row")[10]).toHaveTextContent("Braun, Ryan");
    });
  });
  test("should only display the filters on click", () => {
    render(
      <ThemeProvider theme={GlobalTheme()}>
        <ParentTable columns={columns} values={rows} />
      </ThemeProvider>
    );
    expect(screen.queryByRole("searchbox")).toBeFalsy();
    expect(screen.queryByRole("spinbutton:")).toBeFalsy();
    fireEvent.click(screen.getByTestId("table-show-filters"));
    expect(screen.getAllByRole("searchbox")).toHaveLength(1);
    expect(screen.getAllByRole("spinbutton")).toHaveLength(2);
  });
  describe("should handle filtering of", () => {
    test("text field", () => {
      render(
        <ThemeProvider theme={GlobalTheme()}>
          <ParentTable columns={columns} values={rows} />
        </ThemeProvider>
      );
      expect(screen.getAllByRole("row")).toHaveLength(defaultRowDisplay + 1);
      fireEvent.click(screen.getByTestId("table-show-filters"));
      fireEvent.change(screen.getByRole("searchbox"), { target: { value: "Samantha" } });
      expect(screen.getAllByRole("row")).toHaveLength(2);
    });
    test("numeric field", () => {
      render(
        <ThemeProvider theme={GlobalTheme()}>
          <ParentTable columns={columns} values={rows} />
        </ThemeProvider>
      );
      expect(screen.getAllByRole("row")).toHaveLength(defaultRowDisplay + 1);
      fireEvent.click(screen.getByTestId("table-show-filters"));
      fireEvent.change(screen.getAllByRole("spinbutton")[0], { target: { value: "10" } });
      expect(screen.getAllByRole("row")).toHaveLength(2);
    });
    test("select field", () => {
      columns[3].filterValue = ["0"];
      render(
        <ThemeProvider theme={GlobalTheme()}>
          <ParentTable columns={columns} values={rows} />
        </ThemeProvider>
      );
      expect(screen.getAllByRole("row")).toHaveLength(3);
    });
    test("complex field", () => {
      columns[2].filterValue = ["MIL"];
      render(
        <ThemeProvider theme={GlobalTheme()}>
          <ParentTable columns={columns} values={rows} />
        </ThemeProvider>
      );
      expect(screen.getAllByRole("row")).toHaveLength(10);
    });
  });
  describe("should handle editing", () => {
    test("and cancelling the changes", () => {
      let editCount = 0,
        closeCount = 0;
      const handleClose = () => {
        closeCount++;
      };
      const buildEdit = (handleEditClose, editOpen, editRow) => {
        editCount++;
        expect(editOpen).toEqual(true);
        expect(editRow).toEqual(rows[0]);
        handleEditClose();
      };
      render(
        <ThemeProvider theme={GlobalTheme()}>
          <ParentTable columns={columns} editProps={{ buildWindow: buildEdit, handleClose: handleClose }} values={rows} />
        </ThemeProvider>
      );
      fireEvent.click(screen.getByTestId("row-edit-10"));
      expect(closeCount).toEqual(0);
      expect(editCount).toEqual(1);
    });
    test("and saving the changes", () => {
      let editCount = 0,
        closeCount = 0;
      const handleClose = (editRow) => {
        expect(editRow).toEqual(rows[0]);
        closeCount++;
        return rows;
      };
      const buildEdit = (handleEditClose, editOpen, editRow) => {
        editCount++;
        expect(editOpen).toEqual(true);
        expect(editRow).toEqual(rows[0]);
        handleEditClose(editRow);
      };
      render(
        <ThemeProvider theme={GlobalTheme()}>
          <ParentTable columns={columns} editProps={{ buildWindow: buildEdit, handleClose: handleClose }} values={rows} />
        </ThemeProvider>
      );
      fireEvent.click(screen.getByTestId("row-edit-10"));
      expect(closeCount).toEqual(1);
      expect(editCount).toEqual(1);
    });
  });
  test("should handle displaying a child table", () => {
    render(
      <ThemeProvider theme={GlobalTheme()}>
        <ParentTable childProps={{ columnSelector: () => columns, rowSelector: () => rows, title: "Child Title" }} columns={columns} values={rows} />
      </ThemeProvider>
    );
    expect(screen.queryByText("Child Title")).toBeFalsy();
    fireEvent.click(screen.getByTestId("row-expand-10"));
    expect(screen.getByText("Child Title")).toBeVisible();
  });
});

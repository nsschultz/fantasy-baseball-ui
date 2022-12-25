import { render, screen } from "@testing-library/react";

import ChildTable from "./child-table";
import GlobalTheme from "../global-theme";
import { ThemeProvider } from "@mui/material";

const columns = [
  { title: "Name", field: "name" },
  { title: "Age", field: "age", type: "numeric" },
  { title: "Type", field: "type", lookup: { 0: "", 1: "Batter", 2: "Pitcher" } },
  { title: "Drafted %", field: "draftedPercentage", type: "numeric", format: (value) => value.toFixed(2) },
];
const rows = [
  { id: 10, name: "Schultz, Nick", age: 40, type: 1, draftedPercentage: 0 },
  { id: 11, name: "Schultz, Annie", age: 36, type: 0, draftedPercentage: 0.5 },
  { id: 12, name: "Schultz, James", age: 10, type: 2, draftedPercentage: 1 },
  { id: 13, name: "Schultz, Samantha", age: 7, type: 0, draftedPercentage: 0.99 },
  { id: 14, name: "Braun, Ryan", age: 37, type: 1, draftedPercentage: 0.08 },
  { id: 15, name: "Yount, Robin", age: 65, type: 1, draftedPercentage: 0.19 },
  { id: 16, name: "Molitor, Paul", age: 64, type: 1, draftedPercentage: 0.04 },
  { id: 17, name: "Fingers, Rollie", age: 74, type: 2, draftedPercentage: 0.34 },
  { id: 18, name: "Aaron, Hank", age: 86, type: 1, draftedPercentage: 0.44 },
  { id: 19, name: "Sheets, Ben", age: 43, type: 2, draftedPercentage: 0.15 },
  { id: 20, name: "Wickman, Bob", age: 52, type: 2, draftedPercentage: 0.27 },
];
const title = "Test Title";

describe("Child Table", () => {
  test("should render", () => {
    render(
      <ThemeProvider theme={GlobalTheme()}>
        <ChildTable columns={columns} rowKeyBuilder={(row) => row.id} rows={rows} title={title} />
      </ThemeProvider>
    );
    expect(screen.getByText(title)).toBeVisible();
    expect(screen.getAllByRole("columnheader")).toHaveLength(columns.length);
    expect(screen.getAllByRole("row")).toHaveLength(rows.length + 1);
  });
});

import { render, screen } from "@testing-library/react";

import GlobalTheme from "../../global-theme";
import TableHeaderCell from "./table-header-cell";
import { ThemeProvider } from "@mui/material";

const field = "Field";
const title = "FieldTitle";

const validateTableCell = (align, direction, sortField) => {
  render(<TestWrapper align={align} direction={direction ? direction : undefined} open={open} sortField={sortField} />);
  expect(screen.getByText(title)).toBeVisible();
  if (direction) expect(screen.getByText(direction === "desc" ? "sorted descending" : "sorted ascending")).toBeVisible();
};

const TestWrapper = ({ align, direction, sortField }) => (
  <ThemeProvider theme={GlobalTheme()}>
    <table>
      <thead>
        <tr>
          <TableHeaderCell column={{ align: align, field: field, title: title }} handleSortRequest={() => () => "asc"} order={direction} orderBy={sortField} />
        </tr>
      </thead>
    </table>
  </ThemeProvider>
);

describe("TableHeaderCell", () => {
  describe("should render", () => {
    test("with sort ascending direction", () => validateTableCell("right", "asc", field, false));
    test("with sort descending direction", () => validateTableCell("right", "desc", field, false));
    test("without sort direction", () => validateTableCell("left", false, "OtherField", false));
  });
});

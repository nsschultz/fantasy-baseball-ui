import { render, screen } from "@testing-library/react";

import GlobalTheme from "../../../components/global-theme";
import TableHeaderCell from "../../../components/table/table-header-cell";
import { ThemeProvider } from "@mui/material";

const field = "Field";
const title = "FieldTitle";

const renderHeaderCell = (align, direction, sortField, open) =>
  render(
    <ThemeProvider theme={GlobalTheme()}>
      <TableHeaderCell
        buildSortHandler={() => () => "asc"}
        column={{ field: field, title: title, type: "right" === align ? "numeric" : "string" }}
        order={direction}
        orderBy={sortField}
        filterVisible={open}
      />
    </ThemeProvider>
  );

const validateTableCell = (align, direction, sortField, open) => {
  renderHeaderCell(align, direction, sortField, open);
  expect(screen.getByText(title)).toBeVisible();
  if (direction) {
    expect(screen.getByText(direction === "desc" ? "sorted descending" : "sorted ascending")).toBeVisible();
  }
  if (open) {
    expect(screen.getByRole("searchbox")).toBeVisible();
  } else {
    expect(screen.queryByRole("searchbox")).toBeFalsy();
  }
};

test("should render with sort ascending direction", () => {
  validateTableCell("right", "asc", field, false);
});

test("should render with sort descending direction", () => {
  validateTableCell("right", "desc", field, false);
});

test("should render without sort direction", () => {
  validateTableCell("left", false, "OtherField", false);
});

test("should render with the filter visible", () => {
  validateTableCell("left", false, "OtherField", true);
});

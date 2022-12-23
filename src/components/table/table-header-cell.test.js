import { render, screen } from "@testing-library/react";

import GlobalTheme from "../global-theme";
import TableHeaderCell from "./table-header-cell";
import { ThemeProvider } from "@mui/material";

const field = "Field";
const title = "FieldTitle";

const renderHeaderCell = (align, direction, sortField, open) =>
  render(
    <ThemeProvider theme={GlobalTheme()}>
      <TableHeaderCell
        column={{ field: field, title: title, type: "right" === align ? "numeric" : "string" }}
        filterVisible={open}
        handleFilterChange={() => console.log("filter changed")}
        handleSortRequest={() => () => "asc"}
        order={direction}
        orderBy={sortField}
      />
    </ThemeProvider>
  );

const validateTableCell = (align, direction, sortField, open) => {
  renderHeaderCell(align, direction, sortField, open);
  expect(screen.getByText(title)).toBeVisible();
  if (direction) expect(screen.getByText(direction === "desc" ? "sorted descending" : "sorted ascending")).toBeVisible();
  if (open) expect(screen.getByRole("searchbox")).toBeVisible();
  else expect(screen.queryByRole("searchbox")).toBeFalsy();
};

describe("TableHeaderCell", () => {
  describe("should render", () => {
    xtest("with sort ascending direction", () => validateTableCell("right", "asc", field, false));
    xtest("with sort descending direction", () => validateTableCell("right", "desc", field, false));
    xtest("without sort direction", () => validateTableCell("left", false, "OtherField", false));
    xtest("with the filter visible", () => validateTableCell("left", false, "OtherField", true));
  });
});

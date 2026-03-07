import { Box, SortDirection, TableCell, TableSortLabel } from "@mui/material";

import React from "react";
import { RowValue } from "../../types/table-types";
import { TableColumn } from "./child-table";

interface TableHeaderCellProps<T extends RowValue> {
  readonly column: TableColumn<T>;
  readonly handleSortRequest: (event: React.MouseEvent<unknown>) => void;
  readonly order?: SortDirection;
  readonly orderBy?: string;
}

const hiddenStyle = {
  border: 0,
  clip: "rect(0 0 0 0)",
  height: 1,
  margin: -1,
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  top: 20,
  width: 1,
};

export default function TableHeaderCell<T extends RowValue>({ column, handleSortRequest, order, orderBy }: Readonly<TableHeaderCellProps<T>>) {
  const isActive = orderBy === column.field;

  return (
    <TableCell
      align={column.align}
      key={column.field}
      sortDirection={isActive && order ? order : false}
      sx={{ backgroundColor: "primary.main", color: "text.primary" }}
    >
      <TableSortLabel active={isActive} direction={isActive && order ? order : "asc"} onClick={handleSortRequest}>
        {column.title}
        {isActive ? <Box sx={hiddenStyle}>{order === "desc" ? "sorted descending" : "sorted ascending"}</Box> : null}
      </TableSortLabel>
    </TableCell>
  );
}

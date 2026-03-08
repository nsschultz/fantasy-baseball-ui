import { Box, TableCell, TableSortLabel } from "@mui/material";
import { RowValue, TableHeaderProps } from "../../types/table-types";

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

export default function TableHeaderCell<T extends RowValue>(props: Readonly<TableHeaderProps<T>>) {
  const { column, handleSortRequest, order, orderBy } = props;
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

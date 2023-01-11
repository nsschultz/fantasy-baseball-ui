import { Box, TableCell, TableSortLabel } from "@mui/material";

import PropTypes from "prop-types";
import React from "react";

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

/**
 * Creates a new header cell for the table with sorting and filtering as options.
 * @param {string} column.align      The alignment of the column.
 * @param {string} column.field      The field within the data to display (also used as the key).
 * @param {func}   column.format     Func for formatting the given value.
 * @param {string} column.title      The title for the column header cell.
 * @param {func}   handleSortRequest Handles sort requests events.
 * @param {string} order             The order (asc or desc) that the table is being sorted by.
 * @param {string} orderBy           Indicates the column that sort is being applied to.
 * @returns A new instance of the TableHeaderCell.
 */
const TableHeaderCell = ({ column, handleSortRequest, order, orderBy }) => (
  <TableCell
    align={column.align}
    key={column.field}
    sortDirection={orderBy === column.field ? order : false}
    sx={{ backgroundColor: "primary.main", color: "text.primary" }}
  >
    <TableSortLabel active={orderBy === column.field} direction={orderBy === column.field ? order : "asc"} onClick={handleSortRequest}>
      {column.title}
      {orderBy === column.field ? <Box sx={hiddenStyle}>{order === "desc" ? "sorted descending" : "sorted ascending"}</Box> : null}
    </TableSortLabel>
  </TableCell>
);
TableHeaderCell.propTypes = {
  column: PropTypes.exact({ align: PropTypes.string, field: PropTypes.string.isRequired, format: PropTypes.func, title: PropTypes.string.isRequired })
    .isRequired,
  handleSortRequest: PropTypes.func.isRequired,
  order: PropTypes.string,
  orderBy: PropTypes.string,
};
export default TableHeaderCell;

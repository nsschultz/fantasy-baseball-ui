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
 * @param {object} column             (Required) Object containing all of the information about the column.
 * @param {func}   handleSortRequest  (Required) Handles sort requests events.
 * @param {string} order              (Optional) The order (asc or desc) that the table is being sorted by.
 * @param {string} orderBy            (Optional) Indicates the column that sort is being applied to.
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
  column: PropTypes.object.isRequired,
  handleSortRequest: PropTypes.func.isRequired,
  order: PropTypes.string,
  orderBy: PropTypes.string,
};
export default TableHeaderCell;

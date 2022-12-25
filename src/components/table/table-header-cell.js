import { TableCell, TableSortLabel } from "@mui/material";

import PropTypes from "prop-types";
import React from "react";
import TableFilter from "./table-filter";
import { getAlign } from "./table-funcs";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
});

/**
 * Creates a new header cell for the table with sorting and filtering as options.
 * @param {object} column             (Required) Object containing all of the information about the column.
 * @param {func}   filterVisible      (Optional) Indicates if the filter should be visible or not.
 * @param {func}   handleFilterChange (Required) Handles events that occur when the filter is changed.
 * @param {func}   handleSortRequest  (Required) Handles sort requests events.
 * @param {string} order              (Optional) The order (asc or desc) that the table is being sorted by.
 * @param {string} orderBy            (Optional) Indicates the column that sort is being applied to.
 * @returns A new instance of the TableHeaderCell.
 */
const TableHeaderCell = ({ column, filterVisible, handleFilterChange, handleSortRequest, order, orderBy }) => {
  const classes = useStyles();

  return (
    <TableCell align={getAlign(column)} key={column.field} sortDirection={orderBy === column.field ? order : false}>
      <TableSortLabel active={orderBy === column.field} direction={orderBy === column.field ? order : "asc"} onClick={handleSortRequest}>
        {column.title}
        {orderBy === column.field ? <span className={classes.visuallyHidden}>{order === "desc" ? "sorted descending" : "sorted ascending"}</span> : null}
      </TableSortLabel>
      <br />
      {filterVisible ? <TableFilter column={column} handleFilterChange={handleFilterChange} /> : null}
    </TableCell>
  );
};
TableHeaderCell.propTypes = {
  column: PropTypes.object.isRequired,
  filterVisible: PropTypes.bool,
  handleFilterChange: PropTypes.func.isRequired,
  handleSortRequest: PropTypes.func.isRequired,
  order: PropTypes.string,
  orderBy: PropTypes.string,
};
export default TableHeaderCell;

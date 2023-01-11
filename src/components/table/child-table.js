import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";

import CustomTableRow from "./custom-table-row";
import PropTypes from "prop-types";
import React from "react";

/**
 * Wrapper around a Table with a title that doesn't have complex options.
 * @param {string} columns[].align  The alignment of the column.
 * @param {string} columns[].field  The field within the data to display (also used as the key).
 * @param {func}   columns[].format Func for formatting the given value.
 * @param {string} columns[].title  The title for the column header cell.
 * @param {func}   rowKeyBuilder    The function used for building keys for rows.
 * @param {array}  rows             The rows for the child table.
 * @param {string} title            The title of the child table.
 * @returns A new instance of the ChildTable.
 */
const ChildTable = ({ columns, rowKeyBuilder, rows, title }) => (
  <Box sx={{ paddingBottom: 2, paddingTop: 2 }}>
    <Typography align="left" color="textPrimary" variant="h4">
      {title}
    </Typography>
    <Table size="small">
      <TableHead>
        <TableRow>
          {columns.map((column) => (
            <TableCell align={column.align} key={column.field} sx={{ backgroundColor: "primary.main", color: "text.primary" }}>
              {column.title}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <CustomTableRow columns={columns} key={rowKeyBuilder(row)} values={row} />
        ))}
      </TableBody>
    </Table>
  </Box>
);
ChildTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({ align: PropTypes.string, field: PropTypes.string.isRequired, format: PropTypes.func, title: PropTypes.string.isRequired })
  ).isRequired,
  rowKeyBuilder: PropTypes.func.isRequired,
  rows: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};
export default ChildTable;

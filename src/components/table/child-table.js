import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";

import CustomTableRow from "./custom-table-row";
import PropTypes from "prop-types";
import React from "react";
import { getAlign } from "./table-funcs";

/**
 * Wrapper around a Table with a title that doesn't have complex options.
 * @param {array}  columns       (Required) The columns for the child table.
 * @param {func}   rowKeyBuilder (Required) The function used for building keys for rows.
 * @param {array}  rows          (Required) The rows for the child table.
 * @param {string} title         (Required) The title of the child table.
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
            <TableCell align={getAlign(column)} key={column.field} sx={{ backgroundColor: "primary.main", color: "text.primary" }}>
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
  columns: PropTypes.array.isRequired,
  rowKeyBuilder: PropTypes.func.isRequired,
  rows: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};
export default ChildTable;

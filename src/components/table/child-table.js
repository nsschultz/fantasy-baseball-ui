import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";

import CustomTableRow from "./custom-table-row";
import PropTypes from "prop-types";
import React from "react";
import { getAlign } from "./table-funcs";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  box: { paddingBottom: theme.spacing(2), paddingTop: theme.spacing(2) },
}));

/**
 * Wrapper around a Table with a title that doesn't have complex options.
 * @param {array}  columns (Required) The columns for the child table.
 * @param {array}  rows    (Required) The rows for the child table.
 * @param {string} title   (Required) The title of the child table.
 * @returns A new instance of the ChildTable.
 */
const ChildTable = ({ columns, rows, title }) => {
  const classes = useStyles();

  return (
    <Box className={classes.box}>
      <Typography align="left" color="textPrimary" variant="h4">
        {title}
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell align={getAlign(column)} key={column.field}>
                {column.title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <CustomTableRow columns={columns} key={row.statsType} values={row} />
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};
ChildTable.propTypes = {
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};
export default ChildTable;

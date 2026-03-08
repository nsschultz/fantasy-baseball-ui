import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { ChildTableProps, RowValue } from "../../types/table-types";

import CustomTableRow from "./custom-table-row";

export default function ChildTable<T extends RowValue>(props: Readonly<ChildTableProps<T>>) {
  return (
    <Box sx={{ paddingBottom: 2, paddingTop: 2 }}>
      <Typography align="left" color="textPrimary" variant="h4">
        {props.title}
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            {props.columns.map((column) => (
              <TableCell align={column.align} key={column.field} sx={{ backgroundColor: "primary.main", color: "text.primary" }}>
                {column.title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row) => (
            <CustomTableRow columns={props.columns} key={props.rowKeyBuilder(row)} values={row} />
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}

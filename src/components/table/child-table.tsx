import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";

import CustomTableRow from "./custom-table-row";
import React from "react";

export interface TableColumn<T extends Record<string, unknown>> {
  readonly align?: "left" | "right" | "center" | "justify" | "inherit";
  readonly field: keyof T & string;
  readonly format?: (value: unknown) => React.ReactNode;
  readonly sortComparator?: (obj1: T, obj2: T, key: string | null) => number;
  readonly title: string;
}

interface ChildTableProps<T extends { id: React.Key } & Record<string, unknown>> {
  readonly columns: ReadonlyArray<TableColumn<T>>;
  readonly rowKeyBuilder: (row: T) => React.Key;
  readonly rows: ReadonlyArray<T>;
  readonly title: string;
}

export default function ChildTable<T extends { id: React.Key } & Record<string, unknown>>({
  columns,
  rowKeyBuilder,
  rows,
  title,
}: Readonly<ChildTableProps<T>>) {
  return (
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
}

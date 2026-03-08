import { Collapse, IconButton, TableCell, TableRow, Tooltip } from "@mui/material";
import { CustomTableRowProps, RowValue, RowValueType, TableColumnProps } from "../../types/table-types";
import { Edit, KeyboardArrowDown, KeyboardArrowUp, RemoveCircleOutline } from "@mui/icons-material";

import ChildTable from "./child-table";
import React from "react";

const getDisplayValue = <T extends RowValue>(column: TableColumnProps<T>, value: RowValueType) =>
  column.format ? column.format(value) : (value as React.ReactNode);

export default function CustomTableRow<T extends RowValue>(props: Readonly<CustomTableRowProps<T>>) {
  const { childProps, columns, description, handleDeleteOpen, handleEditOpen, values } = props;
  const [open, setOpen] = React.useState(false);

  const buildActionCell = (rowValues: T) => (
    <TableCell align="center">
      {childProps ? buildExpandButton(rowValues) : null}
      {handleEditOpen ? buildEditButton(rowValues) : null}
      {handleDeleteOpen ? buildDeleteButton(rowValues) : null}
    </TableCell>
  );

  const buildChildTable = (rowValues: T) => {
    if (!childProps) return null;
    return (
      <TableRow key={"child-table" + rowValues.id} sx={{ backgroundColor: "background.paper", color: "text.primary" }}>
        <TableCell colSpan={columns.length + 1} sx={{ paddingBottom: 0, paddingTop: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <ChildTable {...childProps} />
          </Collapse>
        </TableCell>
      </TableRow>
    );
  };

  const buildDeleteButton = (rowValues: T) => (
    <Tooltip title={`Delete the ${description ?? "item"}`}>
      <IconButton
        data-testid={"row-delete-" + rowValues.id}
        onClick={() => handleDeleteOpen?.(rowValues)}
        size="small"
        sx={{ display: "inline-flex", padding: "3px" }}
      >
        <RemoveCircleOutline fontSize="inherit" />
      </IconButton>
    </Tooltip>
  );

  const buildEditButton = (rowValues: T) => (
    <Tooltip title={`Edit the ${description ?? "item"}`}>
      <IconButton
        data-testid={"row-edit-" + rowValues.id}
        onClick={() => handleEditOpen?.(rowValues)}
        size="small"
        sx={{ display: "inline-flex", padding: "3px" }}
      >
        <Edit fontSize="inherit" />
      </IconButton>
    </Tooltip>
  );

  const buildExpandButton = (rowValues: T) => (
    <Tooltip title={`Display the ${childProps?.description}`}>
      <IconButton
        data-testid={"row-expand-" + rowValues.id}
        onClick={() => setOpen((prev) => !prev)}
        size="small"
        sx={{ display: "inline-flex", padding: "3px" }}
      >
        {open ? <KeyboardArrowUp fontSize="inherit" /> : <KeyboardArrowDown fontSize="inherit" />}
      </IconButton>
    </Tooltip>
  );

  return (
    <>
      <TableRow hover key={values.id} sx={{ "& > *": { borderBottom: "none" } }}>
        {childProps || handleDeleteOpen || handleEditOpen ? buildActionCell(values) : null}
        {columns.map((column) => (
          <TableCell align={column.align} key={column.field}>
            {getDisplayValue(column, values[column.field as keyof T])}
          </TableCell>
        ))}
      </TableRow>
      {childProps ? buildChildTable(values) : null}
    </>
  );
}

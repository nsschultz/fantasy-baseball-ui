import { ChildRowProps, ParentTableProps, TableColumnProps } from "../../types/component-types";
import { Paper, SortDirection, Table, TableBody, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";

import { BaseEntity } from "../../types/basic-types";
import CustomTableRow from "./custom-table-row";
import React from "react";
import TableHeaderCell from "./table-header-cell";
import TableToolbar from "./table-toolbar";
import { defaultObjectComparator } from "../../funcs/sort-comparators";

const actionColumn: TableColumnProps<BaseEntity> = { align: "center", field: "actions", title: "Actions" };

const buildChildProps = <T extends BaseEntity>(childProps: ChildRowProps<T>, row: T) =>
  childProps
    ? {
        columns: childProps.columnSelector(row),
        description: childProps.description,
        rowKeyBuilder: childProps.rowKeyBuilder,
        rows: childProps.rowSelector(row),
        title: childProps.title,
      }
    : null;

const getComparator = <T extends BaseEntity>(column: TableColumnProps<T>, defaultComparator: (obj1: T, obj2: T, key: string) => number) => {
  if (!column) return defaultComparator;
  if (column.sortComparator) return column.sortComparator;
  return defaultObjectComparator;
};

const stableSort = <T extends BaseEntity>(
  array: ReadonlyArray<T>,
  comparator: (obj1: T, obj2: T, key: string) => number,
  order: SortDirection,
  orderBy: string
) => {
  const stabilizedThis = array.map((el, index) => [el, index] as const);
  stabilizedThis.sort((a, b) => {
    let value = comparator(a[0], b[0], orderBy);
    if (value === 0) value = b[1] - a[1];
    return value * (order === "desc" ? 1 : -1);
  });
  return stabilizedThis.map((el) => el[0]);
};

export default function ParentTable<T extends BaseEntity>(props: Readonly<ParentTableProps<T>>) {
  const { childProps, columns, deleteProps, description, editProps, sortComparator, toolbarProps, values } = props;
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [deleteRow, setDeleteRow] = React.useState<T>(null);
  const [editOpen, setEditOpen] = React.useState(false);
  const [editRow, setEditRow] = React.useState<T>(null);
  const [limit, setLimit] = React.useState(10);
  const [order, setOrder] = React.useState<SortDirection>("asc");
  const [orderBy, setOrderBy] = React.useState<string>(null);
  const [page, setPage] = React.useState(0);
  const rowCount = React.useMemo(() => values.length, [values]);
  const [rows, setRows] = React.useState<React.ReactNode[]>([]);
  const sortColumn = React.useMemo(() => columns.find((c) => c.field === orderBy), [columns, orderBy]);
  const sortedValues = React.useMemo(
    () => stableSort(values, getComparator(sortColumn, sortComparator), order, orderBy),
    [order, orderBy, sortColumn, sortComparator, values]
  );

  React.useEffect(() => setPage(0), [values]);

  const buildRows = (tableColumns: ReadonlyArray<TableColumnProps<T>>, valuesToRender: ReadonlyArray<T>, rowDescription: string) =>
    valuesToRender
      .slice(page * limit, (page + 1) * limit)
      .map((row) => (
        <CustomTableRow
          childProps={buildChildProps(childProps, row)}
          columns={tableColumns}
          description={rowDescription}
          handleDeleteOpen={deleteProps ? (r) => handleDeleteOpen(r) : undefined}
          handleEditOpen={editProps ? (r) => handleEditOpen(r) : undefined}
          key={row.id}
          values={row}
        />
      ));

  React.useEffect(() => setRows(buildRows(columns, sortedValues, description)), [columns, description, limit, page, sortedValues]);

  const closeDelete = () => {
    setDeleteRow(null);
    setDeleteOpen(false);
  };

  const closeEdit = () => {
    setEditRow(null);
    setEditOpen(false);
  };

  const handleDeleteClose = (deletedObject?: T) => deleteProps?.handleClose(deletedObject, closeDelete);

  const handleDeleteOpen = (row: T) => {
    setDeleteRow(row);
    setDeleteOpen(true);
  };

  const handleEditClose = (editedObject?: T) => editProps?.handleClose(editedObject, closeEdit);

  const handleEditOpen = (row: T) => {
    setEditRow(row);
    setEditOpen(true);
  };

  const handleRequestSort = (_event: React.MouseEvent<unknown>, property: string) => {
    setOrder(orderBy === property && order === "asc" ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <>
      <Paper elevation={5} sx={{ overflow: "hidden", width: "100%" }}>
        {toolbarProps ? (
          <TableToolbar
            addProps={toolbarProps.addProps}
            description={description}
            filterProps={toolbarProps.filterProps}
            searchProps={toolbarProps.searchProps}
            title={toolbarProps.title}
          />
        ) : null}
        <TableContainer sx={{ maxHeight: 725 }}>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                <TableHeaderCell
                  column={actionColumn}
                  handleSortRequest={(event) => handleRequestSort(event, actionColumn.field)}
                  key={actionColumn.field}
                  order={order}
                  orderBy={orderBy}
                />
                {columns.map((column) => (
                  <TableHeaderCell
                    column={column}
                    handleSortRequest={(event) => handleRequestSort(event, column.field)}
                    key={column.field}
                    order={order}
                    orderBy={orderBy}
                  />
                ))}
              </TableRow>
            </TableHead>
            <TableBody>{rows}</TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={rowCount}
          onPageChange={(_event, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => {
            setLimit(Number(event.target.value));
            setPage(0);
          }}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[10, 25, 50, 100]}
        />
      </Paper>
      {deleteProps && deleteRow ? deleteProps.buildDialog(handleDeleteClose, deleteOpen, deleteRow) : null}
      {editProps && editRow ? editProps.buildDialog(handleEditClose, editOpen, editRow) : null}
    </>
  );
}

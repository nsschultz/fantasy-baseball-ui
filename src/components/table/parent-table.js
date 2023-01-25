import { Paper, Table, TableBody, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";

import CustomTableRow from "./custom-table-row";
import PropTypes from "prop-types";
import React from "react";
import TableHeaderCell from "./table-header-cell";
import TableToolbar from "./table-toolbar";
import { defaultObjectComparator } from "../../funcs/sort-comparators";

const actionColumn = { align: "center", field: "actions", title: "Actions" };

const buildChildProps = (childProps, row) =>
  childProps
    ? {
        columns: childProps.columnSelector(row),
        description: childProps.description,
        rowKeyBuilder: childProps.rowKeyBuilder,
        rows: childProps.rowSelector(row),
        title: childProps.title,
      }
    : null;
const getComparator = (column, defaultComparator) => (column ? (column.sortComparator ? column.sortComparator : defaultObjectComparator) : defaultComparator);
const stableSort = (array, comparator, order, orderBy) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    let value = comparator(a[0], b[0], orderBy);
    if (value === 0) value = b[1] - a[1];
    return value * (order === "desc" ? 1 : -1);
  });
  return stabilizedThis.map((el) => el[0]);
};

/**
 * Wrapper around the Table objects that can also create filters, child tables, and editors for the table.
 * @param {func}   childProps.columnSelector             The selector for building the columns of the child table.
 * @param {string} childProps.description                Description used for the tooltip on the child table display button.
 * @param {func}   childProps.rowKeyBuilder              The function used for building keys for rows.
 * @param {func}   childProps.rowSelector                The selector for building the rows of the child table.
 * @param {string} childProps.title                      The title of the child table.
 * @param {string} columns[].align                       The alignment of the column.
 * @param {string} columns[].field                       The field within the data to display (also used as the key).
 * @param {func}   columns[].format                      Func for formatting the given value.
 * @param {func}   columns[].sortComparator              Function for any special handling sorting logic.
 * @param {string} columns[].title                       The title for the column header cell.
 * @param {string} description                           Description used on the delete and edit button's tooltip.
 * @param {func}   editProps.buildWindow                 Function for building the edit window.
 * @param {func}   editProps.handleClose                 Function for handling a close event for the edit window.
 * @param {func}   sortComparator                        Function for the default sorting of the table.
 * @param {func}   toolbarProps.filterProps.buildWindow  Function for building the filter window.
 * @param {func}   toolbarProps.filterProps.handleClose  Function for handling a close event for the filter window.
 * @param {func}   toolbarProps.searchProps.handleSearch Function that is kicked off anytime the value of the searchbox is modified.
 * @param {string} toolbarProps.searchProps.placeholder  The text that will show in the searchbox until a search string is entered.
 * @param {string} toolbarProps.title                    The title for the parent table.
 * @param {object} values                                The actual values that make up the row.
 * @returns A new instance of the ParentTable.
 */
const ParentTable = ({ childProps, deleteProps, description, editProps, columns, sortComparator, toolbarProps, values }) => {
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [deleteRow, setDeleteRow] = React.useState(null);
  const [editOpen, setEditOpen] = React.useState(false);
  const [editRow, setEditRow] = React.useState(null);
  const [limit, setLimit] = React.useState(10);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState(null);
  const [page, setPage] = React.useState(0);
  const rowCount = React.useMemo(() => values.length, [values]);
  const [rows, setRows] = React.useState([]);
  const sortColumn = React.useMemo(() => columns.filter((c) => c.field === orderBy)[0], [columns, orderBy]);
  const sortedValues = React.useMemo(() => stableSort(values, getComparator(sortColumn, sortComparator), order, orderBy), [order, orderBy, values]);

  React.useEffect(() => setPage(0), [values]);
  React.useEffect(() => setRows(buildRows(columns, sortedValues, description)), [columns, limit, page, sortedValues]);

  const buildRows = (columns, rows, description) =>
    rows
      .slice(page * limit, (page + 1) * limit)
      .map((row) => (
        <CustomTableRow
          childProps={buildChildProps(childProps, row)}
          columns={columns}
          description={description}
          handleDeleteOpen={(r) => handleDeleteOpen(r)}
          handleEditOpen={(r) => handleEditOpen(r)}
          key={row.id}
          values={row}
        />
      ));
  const handleDeleteClose = (deletedObject) => {
    setDeleteRow(null);
    setDeleteOpen(false);
    deleteProps.handleClose(deletedObject);
  };
  const handleDeleteOpen = (row) => {
    setDeleteRow(row);
    setDeleteOpen(true);
  };
  const handleEditClose = (editedObject) => {
    setEditRow(null);
    setEditOpen(false);
    editProps.handleClose(editedObject);
  };
  const handleEditOpen = (row) => {
    setEditRow(row);
    setEditOpen(true);
  };
  const handleRequestSort = (event, property) => {
    setOrder(orderBy === property && order === "asc" ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <>
      <Paper sx={{ overflow: "hidden", width: "100%" }}>
        {toolbarProps ? <TableToolbar filterProps={toolbarProps.filterProps} searchProps={toolbarProps.searchProps} title={toolbarProps.title} /> : null}
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
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => setLimit(event.target.value)}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[10, 25, 50, 100]}
        />
      </Paper>
      {deleteProps && deleteRow ? deleteProps.buildDialog(handleDeleteClose, deleteOpen, deleteRow) : null}
      {editProps && editRow ? editProps.buildDialog(handleEditClose, editOpen, editRow) : null}
    </>
  );
};
ParentTable.propTypes = {
  childProps: PropTypes.shape({
    columnSelector: PropTypes.func.isRequired,
    description: PropTypes.string.isRequired,
    rowKeyBuilder: PropTypes.func.isRequired,
    rowSelector: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
  }),
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      align: PropTypes.string,
      field: PropTypes.string.isRequired,
      format: PropTypes.func,
      sortComparator: PropTypes.func,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  deleteProps: PropTypes.shape({ buildDialog: PropTypes.func.isRequired, handleClose: PropTypes.func.isRequired }),
  description: PropTypes.string.isRequired,
  editProps: PropTypes.shape({ buildDialog: PropTypes.func.isRequired, handleClose: PropTypes.func.isRequired }),
  sortComparator: PropTypes.func.isRequired,
  toolbarProps: PropTypes.shape({
    filterProps: PropTypes.shape({ buildDialog: PropTypes.func.isRequired, handleClose: PropTypes.func.isRequired }),
    searchProps: PropTypes.shape({ handleSearch: PropTypes.func.isRequired, placeholder: PropTypes.string.isRequired }),
    title: PropTypes.string.isRequired,
  }),
  values: PropTypes.array.isRequired,
};
export default ParentTable;

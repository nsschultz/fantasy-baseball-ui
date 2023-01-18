import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";

import CustomTableRow from "./custom-table-row";
import PropTypes from "prop-types";
import React from "react";
import TableHeaderCell from "./table-header-cell";
import TableToolbar from "./table-toolbar";

const buildChildProps = (childProps, row) =>
  childProps
    ? { columns: childProps.columnSelector(row), rowKeyBuilder: childProps.rowKeyBuilder, rows: childProps.rowSelector(row), title: childProps.title }
    : null;
const compare = (a, b, orderBy) => (b[orderBy] < a[orderBy] ? -1 : b[orderBy] > a[orderBy] ? 1 : 0);
const getComparator = (order, orderBy) => (a, b) => compare(a, b, orderBy) * (order === "desc" ? 1 : -1);
const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    return order !== 0 ? order : a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

/**
 * Wrapper around the Table objects that can also create filters, child tables, and editors for the table.
 * @param {func}   childProps.columnSelector             The selector for building the columns of the child table.
 * @param {func}   childProps.rowKeyBuilder              The function used for building keys for rows.
 * @param {func}   childProps.rowSelector                The selector for building the rows of the child table.
 * @param {string} childProps.title                      The title of the child table.
 * @param {string} columns[].align                       The alignment of the column.
 * @param {string} columns[].field                       The field within the data to display (also used as the key).
 * @param {func}   columns[].format                      Func for formatting the given value.
 * @param {string} columns[].title                       The title for the column header cell.
 * @param {func}   editProps.buildWindow                 Function for building the edit window.
 * @param {func}   editProps.handleClose                 Function for handling a close event for the edit window.
 * @param {func}   toolbarProps.filterProps.buildWindow  Function for building the filter window.
 * @param {func}   toolbarProps.filterProps.handleClose  Function for handling a close event for the filter window.
 * @param {func}   toolbarProps.searchProps.handleSearch Function that is kicked off anytime the value of the searchbox is modified.
 * @param {string} toolbarProps.searchProps.placeholder  The text that will show in the searchbox until a search string is entered.
 * @param {string} toolbarProps.title                    The title for the parent table.
 * @param {object} values                                The actual values that make up the row.
 * @returns A new instance of the ParentTable.
 */
const ParentTable = ({ childProps, editProps, columns, toolbarProps, values }) => {
  const [editOpen, setEditOpen] = React.useState(false);
  const [editRow, setEditRow] = React.useState(null);
  const [limit, setLimit] = React.useState(10);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState(null);
  const [page, setPage] = React.useState(0);
  const [rowCount, setRowCount] = React.useState(0);
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    setRows(buildRows(columns, values));
  }, [columns, limit, order, orderBy, page, values]);

  const buildRows = (columns, rows) => {
    setRowCount(rows.length);
    return stableSort(rows, getComparator(order, orderBy))
      .slice(page * limit, (page + 1) * limit)
      .map((row) => (
        <CustomTableRow childProps={buildChildProps(childProps, row)} columns={columns} handleEditOpen={(r) => handleEditOpen(r)} key={row.id} values={row} />
      ));
  };
  const handleEditClose = (editedObject) => {
    setEditRow(null);
    setEditOpen(false);
    if (editProps && editedObject) {
      const newValues = editProps.handleClose(editedObject);
      setRows(buildRows(columns, newValues));
    }
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
                <TableCell align="left" sx={{ backgroundColor: "primary.main", color: "text.primary" }}>
                  Actions
                </TableCell>
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
      {editProps && editRow ? editProps.buildDialog(handleEditClose, editOpen, editRow) : null}
    </>
  );
};
ParentTable.propTypes = {
  childProps: PropTypes.shape({
    columnSelector: PropTypes.func.isRequired,
    rowKeyBuilder: PropTypes.func.isRequired,
    rowSelector: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
  }),
  columns: PropTypes.arrayOf(
    PropTypes.shape({ align: PropTypes.string, field: PropTypes.string.isRequired, format: PropTypes.func, title: PropTypes.string.isRequired })
  ).isRequired,
  editProps: PropTypes.shape({ buildDialog: PropTypes.func.isRequired, handleClose: PropTypes.func.isRequired }),
  toolbarProps: PropTypes.shape({
    filterProps: PropTypes.shape({ buildDialog: PropTypes.func.isRequired, handleClose: PropTypes.func.isRequired }),
    searchProps: PropTypes.shape({ handleSearch: PropTypes.func.isRequired, placeholder: PropTypes.string.isRequired }),
    title: PropTypes.string.isRequired,
  }),
  values: PropTypes.array.isRequired,
};
export default ParentTable;

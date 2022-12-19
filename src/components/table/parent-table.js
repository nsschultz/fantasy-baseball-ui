import { Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";

import CustomTableRow from "./custom-table-row";
import { FilterList } from "@mui/icons-material";
import PropTypes from "prop-types";
import TableHeaderCell from "./table-header-cell";

const applyFilter = (column, field) => {
  if (column.lookup)
    return (
      column.filterValue.length === 0 ||
      (column.filterMatcher ? column.filterMatcher(column.filterValue, field) : column.filterValue.some((v) => convertToNumber(v) === field))
    );
  if (column.type === "numeric") return field === convertToNumber(column.filterValue);
  return field && field.toLowerCase().includes(column.filterValue.toLowerCase());
};
const applyFilters = (columns, rows) => {
  var columnsWithFilter = columns.filter((column) => column.filterValue);
  if (columnsWithFilter.length === 0) return rows;
  return rows.filter((row) => columnsWithFilter.length === columnsWithFilter.filter((column) => applyFilter(column, row[column.field])).length);
};
const buildChildProps = (childProps, row) =>
  childProps ? { columns: childProps.columnSelector(row), rows: childProps.rowSelector(row), title: childProps.title } : null;
const convertToNumber = (val) => parseInt(val, 10);
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
 * @param {object} childProps                (Optional) The properties for the child table.
 * @param {func}   childProps.columnSelector (Required) The selector for building the columns of the child table.
 * @param {func}   childProps.rowSelector    (Required) The selector for building the rows of the child table.
 * @param {string} childProps.title          (Required) The title of the child table.
 * @param {object} editProps                 (Optional) The properties for creating an editor for a row.
 * @param {func}   editProps.buildWindow     (Required) Function for building the edit window.
 * @param {func}   editProps.handleClose     (Required) Function for handling a close event for the edit window.
 * @param {array}  columns                   (Required) The columns for the table.
 * @param {object} values                    (Required) The actual values that make up the row.
 * @returns A new instance of the ParentTable.
 */
const ParentTable = ({ childProps, editProps, columns, values }) => {
  const [editOpen, setEditOpen] = useState(false);
  const [editRow, setEditRow] = useState(null);
  const [filterVisible, setFilterVisible] = useState(false);
  const [limit, setLimit] = useState(10);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState(null);
  const [page, setPage] = useState(0);
  const [rowCount, setRowCount] = useState(0);
  const [rows, setRows] = useState([]);

  const buildRows = (columns, rows) => {
    const filteredRows = applyFilters(columns, rows);
    setRowCount(filteredRows.length);
    return stableSort(filteredRows, getComparator(order, orderBy))
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
  const handleFilterVisible = () => setFilterVisible(!filterVisible);
  const handleRequestSort = (event, property) => {
    setOrder(orderBy === property && order === "asc" ? "desc" : "asc");
    setOrderBy(property);
  };
  const onHandleFilterChange = (field, filterValue) => {
    columns.filter((column) => column.field === field).forEach((column) => (column.filterValue = filterValue));
    setRows(buildRows(columns, values));
  };

  useEffect(() => {
    setRows(buildRows(columns, values));
  }, [limit, order, orderBy, page]);

  return (
    <>
      <Box>
        <Paper>
          <TableContainer>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="left">
                    <Tooltip title="Show Column Filters">
                      <IconButton data-testid="table-show-filters" onClick={handleFilterVisible} size="small" sx={{ display: "inline-flex", padding: "3px" }}>
                        <FilterList fontSize="inherit" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  {columns.map((column) => (
                    <TableHeaderCell
                      column={column}
                      filterVisible={filterVisible}
                      handleFilterChange={onHandleFilterChange}
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
        </Paper>
        <TablePagination
          component="div"
          count={rowCount}
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => setLimit(event.target.value)}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[10, 25, 50, 100]}
        />
      </Box>
      {editProps && editRow ? editProps.buildWindow(handleEditClose, editOpen, editRow) : null}
    </>
  );
};
ParentTable.propTypes = {
  childProps: PropTypes.exact({
    columnSelector: PropTypes.func.isRequired,
    rowSelector: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
  }),
  editProps: PropTypes.exact({
    buildWindow: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
  }),
  columns: PropTypes.array.isRequired,
  values: PropTypes.array.isRequired,
};
export default ParentTable;

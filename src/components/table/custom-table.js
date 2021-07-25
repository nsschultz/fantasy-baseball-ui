import { Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import { Edit } from '@material-ui/icons';
import PropTypes from 'prop-types';
import TableHeaderCell from './table-header-cell';
import { makeStyles } from '@material-ui/styles';

const applyFilter = (column, field) => {
  if (column.lookup) return column.filterValue.length === 0 || column.filterValue.some(v => convertToNumber(v) === field);
  if (column.type === 'numeric') return field === convertToNumber(column.filterValue);
  return field && field.toLowerCase().includes(column.filterValue.toLowerCase());
};

const applyFilters = (columns, rows) => {
  var columnsWithFilter = columns.filter((column) => column.filterValue);
  if (columnsWithFilter.length == 0) return rows;
  return rows.filter(row => columnsWithFilter.length == columnsWithFilter.filter(column => applyFilter(column, row[column.field])).length);
};

const convertToNumber = (val) => { return parseInt(val, 10); };

const compare = (a, b, orderBy) => b[orderBy] < a[orderBy] ? -1 : b[orderBy] > a[orderBy] ? 1 : 0;

const getAlign = (column) => column.type === 'numeric' ? 'right' : 'left';

const getComparator = (order, orderBy) => (a, b) => compare(a, b, orderBy) * (order === 'desc' ? 1 : -1);

const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    return (order !== 0) ? order : a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

const useStyles = makeStyles({ container: { display: 'flex', overflowX: 'initial' } });

const CustomTable = ({columns, values, buildEdit, handleClose}) => {
  const classes = useStyles();
  const [editOpen, setEditOpen] = useState(false);
  const [editRow, setEditRow] = useState(null);
  const [limit, setLimit] = useState(10);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState(null);
  const [page, setPage] = useState(0);
  const [rowCount, setRowCount] = useState(0);
  const [rows, setRows] = useState([]);
  
  useEffect(() => { setRows(buildRows(columns, values)); }, [limit, order, orderBy, page]);

  const buildRows = (columns, rows) => {
    const filteredRows = applyFilters(columns, rows);
    setRowCount(filteredRows.length);
    return stableSort(filteredRows, getComparator(order, orderBy))
      .slice(page*limit, (page+1)*limit)
      .map((row) => {
        return (
          <TableRow hover key={row.id}>
            <TableCell>
              <IconButton onClick={() => handleEditOpen(row)} size='small'><Edit fontSize='inherit'/></IconButton>
            </TableCell>
            {columns.map((column) => 
              <TableCell key={column.field} align={getAlign(column)}>{getValue(column, row[column.field])}</TableCell>
            )}
          </TableRow>
        );
      });
  };

  const buildSortHandler = (property) => (event) => handleRequestSort(event, property);

  const getValue = (column, value) => column.format && typeof value === 'number' ? column.format(value) : column.lookup ? column.lookup[value] : value;
  
  const handleEditClose = (editedObject) => { 
    setEditRow(null);
    setEditOpen(false);
    if (handleClose) {
      const newValues = handleClose(editedObject);
      setRows(buildRows(columns, newValues));
    }
   };

  const handleEditOpen = (row) => {
    setEditRow(row);
    setEditOpen(true);
   };

  const handleRequestSort = (event, property) => {
    setOrder(orderBy === property && order === 'asc' ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const onHandleFilterChange = (field, filterValue) => {
    columns.filter((column) => column.field === field).forEach((column) => column.filterValue = filterValue);
    setRows(buildRows(columns, values));
  };

  return (
    <>
      <Box>
        <Paper>
          <TableContainer className={classes.container}>
            <Table stickyHeader size='small'>
              <TableHead>
                <TableRow>
                  <TableCell align='left'/>
                  {columns.map((column) => 
                    <TableHeaderCell 
                      buildSortHandler={(key) => buildSortHandler(key)}
                      column={column} 
                      onHandleFilterChange={onHandleFilterChange}
                      getAlign={(column) => getAlign(column)}
                      key={column.field} 
                      order={order}
                      orderBy={orderBy}
                    />)}
                </TableRow>
              </TableHead>
              <TableBody>{rows}</TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <TablePagination 
          component='div' 
          count={rowCount} 
          onPageChange={(event, newPage) => setPage(newPage)} 
          onRowsPerPageChange={(event) => setLimit(event.target.value)} 
          page={page} 
          rowsPerPage={limit} 
          rowsPerPageOptions={[10,25,50,100]}/>
      </Box>
      {buildEdit && editRow ? buildEdit(handleEditClose, editOpen, editRow) : null}
    </>
  );
}

CustomTable.propTypes = { 
  columns: PropTypes.array.isRequired,
  values: PropTypes.array.isRequired,
  buildEdit: PropTypes.func,
  handleClose: PropTypes.func
};

export default CustomTable;
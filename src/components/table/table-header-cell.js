import { TableCell, TableSortLabel } from '@material-ui/core';

import PropTypes from 'prop-types';
import React from 'react';
import TableFilter from './table-filter';
import { getAlign } from './table-funcs';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({ 
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  }
});

const TableHeaderCell = ({ buildSortHandler, column, onHandleFilterChange, order, filterVisible, orderBy }) => {
  const classes = useStyles();
  
  return (
    <TableCell align={getAlign(column)} key={column.field} sortDirection={orderBy === column.field ? order : false}>
      <TableSortLabel active={orderBy === column.field} direction={orderBy === column.field ? order : 'asc'} onClick={buildSortHandler(column.field)}>
        {column.title}
        {orderBy === column.field ? (<span className={classes.visuallyHidden}>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</span>) : null}
      </TableSortLabel>
      <br/>
      {filterVisible ? <TableFilter column={column} onHandleFilterChange={onHandleFilterChange}/> : null}
    </TableCell>
  );
};

TableHeaderCell.propTypes = {
  buildSortHandler: PropTypes.func.isRequired,
  column: PropTypes.object.isRequired,
  onHandleFilterChange: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  filterVisible: PropTypes.bool,
  orderBy: PropTypes.string
};
  
export default TableHeaderCell;
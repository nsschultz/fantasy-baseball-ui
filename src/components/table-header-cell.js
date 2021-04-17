import { TableCell, TableSortLabel } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

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

const TableHeaderCell = ({ column, getAlign, buildSortHandler, order, orderBy }) => {
  const classes = useStyles();

  return (
    <TableCell key={column.field} align={getAlign(column)} sortDirection={orderBy === column.field ? order : false}>
      <TableSortLabel active={orderBy === column.field} direction={orderBy === column.field ? order : 'asc'} onClick={buildSortHandler(column.field)}>
        {column.title}
        {orderBy === column.field ? (<span className={classes.visuallyHidden}>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</span>) : null}
      </TableSortLabel>
    </TableCell>
  );
};

TableHeaderCell.propTypes = {
  buildSortHandler: PropTypes.func.isRequired,
  column: PropTypes.object.isRequired,
  getAlign: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired
};
  
export default TableHeaderCell;
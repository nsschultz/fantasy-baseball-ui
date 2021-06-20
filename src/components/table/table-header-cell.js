import { IconButton, Popover, TableCell, TableSortLabel } from '@material-ui/core';
import React, { useState } from 'react';

import { FilterList } from '@material-ui/icons';
import PropTypes from 'prop-types';
import TableFilter from './table-filter';
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

const TableHeaderCell = ({ column, onHandleFilterChange, getAlign, buildSortHandler, order, orderBy }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event) => setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  return (
    <TableCell key={column.field} align={getAlign(column)} sortDirection={orderBy === column.field ? order : false}>
      <TableSortLabel active={orderBy === column.field} direction={orderBy === column.field ? order : 'asc'} onClick={buildSortHandler(column.field)}>
        {column.title}
        {orderBy === column.field ? (<span className={classes.visuallyHidden}>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</span>) : null}
      </TableSortLabel>
      <IconButton size="small" onClick={handleOpen}><FilterList fontSize="inherit"/></IconButton>
      <Popover anchorEl={anchorEl} open={open} onClose={handleClose}><TableFilter column={column} onHandleFilterChange={onHandleFilterChange}/></Popover>
    </TableCell>
  );
};

TableHeaderCell.propTypes = {
  buildSortHandler: PropTypes.func.isRequired,
  column: PropTypes.object.isRequired,
  onHandleFilterChange: PropTypes.func.isRequired,
  getAlign: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string
};
  
export default TableHeaderCell;
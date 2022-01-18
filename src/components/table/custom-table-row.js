import { Collapse, IconButton, TableCell, TableRow } from '@material-ui/core';
import { Edit, KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import React, { useState } from 'react';

import ChildTable from './child-table';
import PropTypes from 'prop-types';
import { getAlign } from './table-funcs';
import { makeStyles } from '@material-ui/styles';

const getValue = (column, value) => 
  column.format && typeof value === 'number' 
    ? column.format(value) 
    : column.lookup 
      ? column.lookup[value] 
      : value;

const useStyles = makeStyles({ 
  collapse: {
    paddingBottom: 0,
    paddingTop: 0
  }
});

const CustomTableRow = ({columns, values, childColumns, childRows, childTitle, handleEditOpen}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const buildActionCell = (values) => {
    return (
      <TableCell>
        {childColumns ? buildExpandButton(values) : null}
        {handleEditOpen ? buildEditButton(values) : null}
      </TableCell>
    );};

  const buildChildTable = (values) => {
    return (
      <TableRow key={'child-table'+values.id}>
        <TableCell className={classes.collapse} colSpan={columns.length + 1}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <ChildTable columns={childColumns} rows={childRows} title={childTitle}/>
          </Collapse>
        </TableCell>
      </TableRow>
    );};

  const buildEditButton = (values) => {
    return (<IconButton id={'edit-'+values.id} onClick={() => handleEditOpen(values)} size='small'><Edit fontSize='inherit'/></IconButton>);
  };

  const buildExpandButton = (values) => {
    return (
      <IconButton id={'expand-'+values.id} onClick={() => setOpen(!open)} size='small'>
        {open ? <KeyboardArrowUp fontSize='inherit'/> : <KeyboardArrowDown fontSize='inherit'/>}
      </IconButton>
    );};

  const needsActionCell = () => childColumns || handleEditOpen;

  return (
    <>
      <TableRow hover key={values.id} sx={{ '& > *': { borderBottom: 'none' } }}>
        {needsActionCell() ? buildActionCell(values) : null}
        {columns.map((column) => 
          <TableCell key={column.field} align={getAlign(column)}>{getValue(column, values[column.field])}</TableCell>
        )}
      </TableRow>
      {childColumns ? buildChildTable(values) : null}
    </>
  );
}

CustomTableRow.propTypes = { 
  columns: PropTypes.array.isRequired,
  values: PropTypes.object.isRequired,
  childColumns: PropTypes.array,
  childRows: PropTypes.array,
  childTitle: PropTypes.string,
  handleEditOpen: PropTypes.func
};

export default CustomTableRow;
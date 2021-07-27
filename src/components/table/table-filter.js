import React, { createRef } from 'react';

import CustomSelect from "../input/custom-select-field";
import CustomTextField from "../input/custom-text-field";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({ 
  filterModal: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  }
}));

const TableFilter = ({ column, onHandleFilterChange }) => {
  const classes = useStyles();
  const input = createRef();

  const onChange = (event) => { onHandleFilterChange(column.field, event.target.value); };

  return (
    <div className={classes.filterModal}>
      {(column.lookup) 
        ? <CustomSelect 
            id={column.id}
            title={column.title}
            field={column.field}
            lookup={column.lookup}
            filterValues={column.filterValue}
            onHandleFilterChange={onHandleFilterChange}
          />
        : <CustomTextField
            label={column.title}
            onChange={(event) => onChange(event)}
            size='small'
            type={column.type === 'numeric' ? 'number' : 'search'}
            defaultValue={column.filterValue ? column.type === 'numeric' ? parseInt(column.filterValue, 10) : column.filterValue : null}
            ref={input}
            variant='filled'
          />
      }
    </div>
  );
};

TableFilter.propTypes = { 
  column: PropTypes.object.isRequired,
  onHandleFilterChange: PropTypes.func.isRequired
};

export default TableFilter;
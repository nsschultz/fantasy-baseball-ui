import { Checkbox, Input, ListItemText, MenuItem, Select, TextField } from "@material-ui/core";
import React, { createRef, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/styles';

import PropTypes from 'prop-types';

const MenuProps = { PaperProps: { style: { maxHeight: 224, width: 250 } } };

const useStyles = makeStyles((theme) => ({ 
  filterModal: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  }
}));

const CustomTextField = withStyles(theme => ({ root: { '& label.Mui-focused': { color: theme.palette.text.secondary } } }))(TextField);

const TableFilter = ({ column, onHandleFilterChange }) => {
  const classes = useStyles();
  const input = createRef();
  const [multipleFilters, setMultipleFilters] = useState(column.filterValue || []);

  const onChange = (event) => { onHandleFilterChange(column.field, event.target.value); };

  const onChangeMulti = (event) => { 
    setMultipleFilters(event.target.value);
    onHandleFilterChange(column.field, event.target.value);
   };

  return (
    <div className={classes.filterModal}>
      {(column.lookup) 
        ? <Select
        multiple
        value={multipleFilters}
        onChange={(event) => onChangeMulti(event)}
        input={<Input id={"select-multiple-checkbox" + column.id}/>}
        renderValue={(selecteds) => selecteds.map((selected) => column.lookup[selected]).join(", ")}
        MenuProps={MenuProps}
        style={{ marginTop: 0 }}
      >
        {Object.keys(column.lookup).map((key) => (
          <MenuItem key={key} value={key}>
            <Checkbox checked={multipleFilters.indexOf(key.toString()) > -1} />
            <ListItemText primary={column.lookup[key]} />
          </MenuItem>
        ))}
      </Select>
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
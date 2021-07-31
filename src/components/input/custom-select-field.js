import { Checkbox, FormControl, Input, InputLabel, ListItemText, MenuItem, Select } from "@material-ui/core";
import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  }
}));

const MenuProps = { PaperProps: { style: { maxHeight: 224, width: 250 } } };

const CustomSelectField = ({field, filterValues, id, lookup, onHandleFilterChange, title}) => {
  const classes = useStyles();
  const [filters, setFilters] = useState(filterValues || []);

  const onChange = (event) => { 
    setFilters(event.target.value);
    onHandleFilterChange(field, event.target.value);
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel>{title}</InputLabel>
      <Select
        multiple
        value={filters}
        onChange={(event) => onChange(event)}
        input={<Input id={"select-multiple-checkbox" + id}/>}
        renderValue={(selecteds) => selecteds.map((selected) => lookup[selected]).join(", ")}
        MenuProps={MenuProps}
      >
        {Object.keys(lookup).map((key) => (
          <MenuItem key={key} value={key}>
            <Checkbox checked={filters.indexOf(key.toString()) > -1} />
            <ListItemText primary={lookup[key]} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

CustomSelectField.propTypes = { 
  field: PropTypes.string.isRequired,
  filterValues: PropTypes.array,
  id: PropTypes.string.isRequired,
  lookup: PropTypes.any.isRequired,
  onHandleFilterChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
};

export default CustomSelectField;
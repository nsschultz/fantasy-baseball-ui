import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, Select } from '@material-ui/core';
import React, { useState } from 'react';

import CustomInuptBase from './custom-input-base';
import PropTypes from 'prop-types';

const MenuProps = { PaperProps: { style: { maxHeight: 224 } } };

const CustomSelectField = ({field, filterValues, lookup, onHandleFilterChange, title, width}) => {
  const [filters, setFilters] = useState(filterValues || []);

  const onChange = (event) => { 
    setFilters(event.target.value);
    onHandleFilterChange(event);
  };

  return (
    <FormControl variant='outlined'>
      {title ? <InputLabel>{title}</InputLabel> : null}
      <Select
        multiple
        value={filters}
        onChange={(event) => onChange(event)}
        input={<CustomInuptBase id={'select-multiple-checkbox-' + field}/>}
        renderValue={(selecteds) => selecteds.map((selected) => lookup[selected]).join(', ')}
        MenuProps={MenuProps}
        style={{width: width ? width : 100}}
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
  lookup: PropTypes.any.isRequired,
  onHandleFilterChange: PropTypes.func.isRequired,
  title: PropTypes.string,
  width: PropTypes.number
};

export default CustomSelectField;
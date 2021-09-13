import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, Select } from '@material-ui/core';
import React, { useState } from 'react';

import CustomInuptBase from './custom-input-base';
import PropTypes from 'prop-types';

const CustomSelectField = ({ field, lookup, onHandleFilterChange, filterValues, title, width }) => {
  const [filters, setFilters] = useState(filterValues || []);

  const onChange = (event) => { 
    setFilters(event.target.value);
    onHandleFilterChange(event);
  };

  return (
    <FormControl variant='outlined'>
      {title ? <InputLabel>{title}</InputLabel> : null}
      <Select
        input={<CustomInuptBase id={'select-multiple-checkbox-' + field}/>}
        multiple
        onChange={(event) => onChange(event)}
        renderValue={(selecteds) => selecteds.map((selected) => lookup[selected]).join(', ')}
        style={{width: width ? width : 100}}
        value={filters}
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
  lookup: PropTypes.any.isRequired,
  onHandleFilterChange: PropTypes.func.isRequired,
  filterValues: PropTypes.array,
  title: PropTypes.string,
  width: PropTypes.number
};

export default CustomSelectField;
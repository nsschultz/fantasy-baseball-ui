import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";

import CustomInuptBase from "./custom-input-base";
import PropTypes from "prop-types";

/**
 * (Deprecated) Wrapper that creates Select with the option to select multiples and shows checkboxes next to the selected values.
 * @param {array}  existingValues (Optional) An array of values that have alrady been selected.
 * @param {string} field          (Required) The field that backs the input (used as an id).
 * @param {func}   handleOnChange (Required) The function that is called when the value changes.
 * @param {any}    lookup         (Required) The collection of lookup values (object).
 * @param {string} title          (Optional) The title to display.
 * @param {number} width          (Optional) The width of the input.
 * @returns A new instance of the CustomSelectField.
 */
const CustomSelectField = ({ existingValues, field, handleOnChange, lookup, title, width }) => {
  const [values, setValues] = useState(existingValues || []);

  /**
   * Updates the state of the value and passes the event on to function that was provided by the parent object.
   * @param {object} event The change event.
   */
  const onChange = (event) => {
    setValues(event.target.value);
    handleOnChange(event);
  };

  return (
    <FormControl variant="outlined">
      {title ? <InputLabel>{title}</InputLabel> : null}
      <Select
        input={<CustomInuptBase id={"select-multiple-checkbox-" + field} />}
        multiple
        onChange={(event) => onChange(event)}
        renderValue={(selecteds) => selecteds.map((selected) => lookup[selected]).join(", ")}
        style={{ width: width ? width : 100 }}
        value={values}
      >
        {Object.keys(lookup).map((key) => (
          <MenuItem key={key} value={key}>
            <Checkbox checked={values.indexOf(key.toString()) > -1} color="secondary" />
            <ListItemText primary={lookup[key]} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

CustomSelectField.propTypes = {
  existingValues: PropTypes.array,
  field: PropTypes.string.isRequired,
  handleOnChange: PropTypes.func.isRequired,
  lookup: PropTypes.any.isRequired,
  title: PropTypes.string,
  width: PropTypes.number,
};

export default CustomSelectField;

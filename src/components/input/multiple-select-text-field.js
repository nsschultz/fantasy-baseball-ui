import { Checkbox, ListItemText, MenuItem } from "@mui/material";
import React, { useState } from "react";

import CustomTextField from "./custom-text-field";
import PropTypes from "prop-types";

/**
 * Wrapper that turns the CustomTextField into a multi-select input.
 * @param {object} displayProps                  (Required) An object that contains all of the properties needed to render the text field.
 * @param {func}   displayProps.disableChecker   (Optional) Function that is used to determine if certain options should be disabled.
 * @param {string} displayProps.label            (Optional) The value to use as the label.
 * @param {func}   displayProps.listItemBuilder  (Required) Function that determines how the text shows up in the list items.
 * @param {func}   displayProps.textValueBuilder (Required) Function that determines how the text shows up in the text box.
 * @param {string} field                         (Required) The field that backs the input (used as an id).
 * @param {func}   handleOnChange                (Required) The function that is called when the value changes.
 * @param {object} menuItems                     (Required) The collection of lookup values (key value pair based on the object provided).
 * @param {array}  selectedValues                (Optional) An array of values that have alrady been selected (the array contains the keys).
 * @returns A new instance of the MultipleSelectTextField.
 */
const MultipleSelectTextField = ({ displayProps, field, handleOnChange, menuItems, selectedValues }) => {
  const [values, setValues] = useState(selectedValues || []);

  const onChange = (value) => {
    setValues(value);
    handleOnChange(value);
  };

  return (
    <CustomTextField
      fullWidth
      id={field}
      label={displayProps.label}
      select
      SelectProps={{
        multiple: true,
        onChange: (event) => onChange(event.target.value),
        renderValue: () => displayProps.textValueBuilder(),
        value: selectedValues || [],
      }}
      size="small"
      variant="filled"
    >
      {Object.keys(menuItems).map((key) => (
        <MenuItem disabled={displayProps.disableChecker && displayProps.disableChecker(menuItems, values, key)} key={key} value={key}>
          <Checkbox checked={values.indexOf(key.toString()) > -1} color="secondary" />
          <ListItemText primary={displayProps.listItemBuilder(menuItems, key)} />
        </MenuItem>
      ))}
    </CustomTextField>
  );
};
MultipleSelectTextField.propTypes = {
  displayProps: PropTypes.exact({
    disableChecker: PropTypes.func,
    label: PropTypes.string,
    listItemBuilder: PropTypes.func.isRequired,
    textValueBuilder: PropTypes.func.isRequired,
  }).isRequired,
  field: PropTypes.string.isRequired,
  handleOnChange: PropTypes.func.isRequired,
  menuItems: PropTypes.object.isRequired,
  selectedValues: PropTypes.array,
};
export default MultipleSelectTextField;

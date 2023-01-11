import { Checkbox, ListItemText, MenuItem } from "@mui/material";

import PropTypes from "prop-types";
import React from "react";
import { StyledTextField } from "../styled/styled-text-field";

/**
 * Wrapper that turns the CustomTextField into a multi-select input.
 * @param {func}   displayProps.disableChecker   Function that is used to determine if certain options should be disabled.
 * @param {string} displayProps.label            The value to use as the label.
 * @param {func}   displayProps.listItemBuilder  Function that determines how the text shows up in the list items.
 * @param {func}   displayProps.textValueBuilder Function that determines how the text shows up in the text box.
 * @param {string} field                         The field that backs the input (used as an id).
 * @param {func}   handleOnChange                The function that is called when the value changes.
 * @param {object} menuItems                     The collection of lookup values (key value pair based on the object provided).
 * @param {array}  selectedValues                An array of values that have alrady been selected (the array contains the keys).
 * @returns A new instance of the MultipleSelectTextField.
 */
const MultipleSelectTextField = ({ displayProps, field, handleOnChange, menuItems, selectedValues }) => (
  <StyledTextField
    fullWidth
    id={field}
    label={displayProps.label}
    select
    SelectProps={{
      multiple: true,
      onChange: (event) => handleOnChange(event.target.value),
      renderValue: () => displayProps.textValueBuilder(),
      value: selectedValues || [],
    }}
    size="small"
    variant="filled"
  >
    {Object.keys(menuItems).map((key) => (
      <MenuItem disabled={displayProps.disableChecker && displayProps.disableChecker(menuItems, selectedValues, key)} key={key} value={key}>
        <Checkbox checked={(selectedValues || []).indexOf(key.toString()) > -1} color="secondary" />
        <ListItemText primary={displayProps.listItemBuilder(menuItems, key)} />
      </MenuItem>
    ))}
  </StyledTextField>
);
MultipleSelectTextField.propTypes = {
  displayProps: PropTypes.shape({
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

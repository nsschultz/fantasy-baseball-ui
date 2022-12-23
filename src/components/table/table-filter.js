import React, { createRef } from "react";

import CustomInuptBase from "../input/custom-input-base";
import CustomSelectField from "../input/custom-select-field";
import PropTypes from "prop-types";

/**
 * Creates a new filter that will either be a simple input or a select field based on the column.
 * @param {object} column             (Required) The column that the filter is a part of.
 * @param {func}   handleFilterChange (Required) Function that is called on change. With both the event and the column.
 * @returns A new instance of the TableFilter.
 */
const TableFilter = ({ column, handleFilterChange }) => {
  const input = createRef();

  const buildSelectField = () => (
    <CustomSelectField field={column.field} existingValues={column.filterValue} lookup={column.lookup} handleOnChange={onChange} width={column.width} />
  );
  const buildInputBase = () => (
    <CustomInuptBase
      defaultValue={column.filterValue ? (column.type === "numeric" ? parseInt(column.filterValue, 10) : column.filterValue) : null}
      onChange={onChange}
      ref={input}
      size="small"
      style={{ width: column.width ? column.width : 100 }}
      type={column.type === "numeric" ? "number" : "search"}
      variant="outlined"
    />
  );
  const onChange = (event) => handleFilterChange(column.field, event.target.value);

  return <div>{column.lookup ? buildSelectField() : buildInputBase()}</div>;
};
TableFilter.propTypes = {
  column: PropTypes.object.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
};
export default TableFilter;

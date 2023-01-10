import { Collapse, IconButton, TableCell, TableRow } from "@mui/material";
import { Edit, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

import ChildTable from "./child-table";
import PropTypes from "prop-types";
import React from "react";

const getDisplayValue = (column, value) => (column.format ? column.format(value) : column.lookup ? column.lookup[value] : value);

/**
 * Wrapper around the TableRow that adds the ability to add a child table and edit functionality.
 * @param {object} childProps               (Optional) The properties for the child table.
 * @param {array}  childProps.columns       (Required) The columns for the child table.
 * @param {func}   childProps.rowKeyBuilder (Required) The function used for building keys for rows.
 * @param {array}  childProps.rows          (Required) The rows for the child table.
 * @param {string} childProps.title         (Required) The title of the child table.
 * @param {array}  columns                  (Required) The columns from the parent table.
 * @param {func}   handleEditOpen           (Optional) The function that is called when the edit button is clicked. Providing this function determines if the button exists or not.
 * @param {object} values                   (Required) The actual values that make up the row.
 * @returns A new instance of the CustomTableRow.
 */
const CustomTableRow = ({ childProps, columns, handleEditOpen, values }) => {
  const [open, setOpen] = React.useState(false);

  const buildActionCell = (values) => (
    <TableCell>
      {childProps ? buildExpandButton(values) : null}
      {handleEditOpen ? buildEditButton(values) : null}
    </TableCell>
  );
  const buildChildTable = (values) => (
    <TableRow key={"child-table" + values.id} sx={{ backgroundColor: "background.paper", color: "text.primary" }}>
      <TableCell colSpan={columns.length + 1} sx={{ paddingBottom: 0, paddingTop: 0 }}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <ChildTable columns={childProps.columns} rowKeyBuilder={childProps.rowKeyBuilder} rows={childProps.rows} title={childProps.title} />
        </Collapse>
      </TableCell>
    </TableRow>
  );
  const buildEditButton = (values) => (
    <IconButton data-testid={"row-edit-" + values.id} onClick={() => handleEditOpen(values)} size="small" sx={{ display: "inline-flex", padding: "3px" }}>
      <Edit fontSize="inherit" />
    </IconButton>
  );
  const buildExpandButton = (values) => (
    <IconButton data-testid={"row-expand-" + values.id} onClick={() => setOpen(!open)} size="small" sx={{ display: "inline-flex", padding: "3px" }}>
      {open ? <KeyboardArrowUp fontSize="inherit" /> : <KeyboardArrowDown fontSize="inherit" />}
    </IconButton>
  );

  return (
    <>
      <TableRow hover key={values.id} sx={{ "& > *": { borderBottom: "none" } }}>
        {childProps || handleEditOpen ? buildActionCell(values) : null}
        {columns.map((column) => (
          <TableCell align={column.align} key={column.field}>
            {getDisplayValue(column, values[column.field])}
          </TableCell>
        ))}
      </TableRow>
      {childProps ? buildChildTable(values) : null}
    </>
  );
};
CustomTableRow.propTypes = {
  childProps: PropTypes.exact({
    columns: PropTypes.array.isRequired,
    rowKeyBuilder: PropTypes.func.isRequired,
    rows: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
  }),
  columns: PropTypes.array.isRequired,
  handleEditOpen: PropTypes.func,
  values: PropTypes.object.isRequired,
};
export default CustomTableRow;

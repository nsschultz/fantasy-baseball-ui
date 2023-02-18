import { Collapse, IconButton, TableCell, TableRow, Tooltip } from "@mui/material";
import { Edit, KeyboardArrowDown, KeyboardArrowUp, RemoveCircleOutline } from "@mui/icons-material";

import ChildTable from "./child-table";
import PropTypes from "prop-types";
import React from "react";

const getDisplayValue = (column, value) => (column.format ? column.format(value) : value);

/**
 * Wrapper around the TableRow that adds the ability to add a child table and edit functionality.
 * @param {string} childProps.columns[].align  The alignment of the column.
 * @param {string} childProps.columns[].field  The field within the data to display (also used as the key).
 * @param {func}   childProps.columns[].format Func for formatting the given value.
 * @param {string} childProps.columns[].title  The title for the column header cell.
 * @param {string} childProps.description      Description used for the tooltip on the child table display button.
 * @param {func}   childProps.rowKeyBuilder    The function used for building keys for rows.
 * @param {array}  childProps.rows             The rows for the child table.
 * @param {string} childProps.title            The title of the child table.
 * @param {string} columns[].align             The alignment of the column.
 * @param {string} columns[].field             The field within the data to display (also used as the key).
 * @param {func}   columns[].format            Func for formatting the given value.
 * @param {func}   columns[].sortComparator    Function for any special handling sorting logic.
 * @param {string} columns[].title             The title for the column header cell.
 * @param {string} description                 Description used on the delete and edit button's tooltip.
 * @param {func}   handleDeleteOpen            The function that is called when the delete button is clicked. Providing this function determines if the button exists or not.
 * @param {func}   handleEditOpen              The function that is called when the edit button is clicked. Providing this function determines if the button exists or not.
 * @param {object} values                      The actual values that make up the row.
 * @returns A new instance of the CustomTableRow.
 */
const CustomTableRow = ({ childProps, columns, description, handleDeleteOpen, handleEditOpen, values }) => {
  const [open, setOpen] = React.useState(false);

  const buildActionCell = (values) => (
    <TableCell align="center">
      {childProps ? buildExpandButton(values) : null}
      {handleEditOpen ? buildEditButton(values) : null}
      {handleDeleteOpen ? buildDeleteButton(values) : null}
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
  const buildDeleteButton = (values) => (
    <Tooltip title={`Delete the ${description}`}>
      <IconButton data-testid={"row-delete-" + values.id} onClick={() => handleDeleteOpen(values)} size="small" sx={{ display: "inline-flex", padding: "3px" }}>
        <RemoveCircleOutline fontSize="inherit" />
      </IconButton>
    </Tooltip>
  );
  const buildEditButton = (values) => (
    <Tooltip title={`Edit the ${description}`}>
      <IconButton data-testid={"row-edit-" + values.id} onClick={() => handleEditOpen(values)} size="small" sx={{ display: "inline-flex", padding: "3px" }}>
        <Edit fontSize="inherit" />
      </IconButton>
    </Tooltip>
  );
  const buildExpandButton = (values) => (
    <Tooltip title={`Display the ${childProps.description}`}>
      <IconButton data-testid={"row-expand-" + values.id} onClick={() => setOpen(!open)} size="small" sx={{ display: "inline-flex", padding: "3px" }}>
        {open ? <KeyboardArrowUp fontSize="inherit" /> : <KeyboardArrowDown fontSize="inherit" />}
      </IconButton>
    </Tooltip>
  );

  return (
    <>
      <TableRow hover key={values.id} sx={{ "& > *": { borderBottom: "none" } }}>
        {childProps || handleDeleteOpen || handleEditOpen ? buildActionCell(values) : null}
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
    columns: PropTypes.arrayOf(
      PropTypes.shape({ align: PropTypes.string, field: PropTypes.string.isRequired, format: PropTypes.func, title: PropTypes.string.isRequired })
    ).isRequired,
    description: PropTypes.string.isRequired,
    rowKeyBuilder: PropTypes.func.isRequired,
    rows: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
  }),
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      align: PropTypes.string,
      field: PropTypes.string.isRequired,
      format: PropTypes.func,
      sortComparator: PropTypes.func,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  description: PropTypes.string,
  handleDeleteOpen: PropTypes.func,
  handleEditOpen: PropTypes.func,
  values: PropTypes.object.isRequired,
};
export default CustomTableRow;

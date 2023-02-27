import { AddCircleOutline, FilterAlt, FilterAltOutlined, Search } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField, Toolbar, Tooltip, Typography } from "@mui/material";

import PropTypes from "prop-types";
import React from "react";

const searchbarInputProps = {
  startAdornment: (
    <InputAdornment position="start">
      <Search />
    </InputAdornment>
  ),
};

/**
 * Wrapper around the Toolbar that supports filtering and adding rows.
 * @param {func}   addProps.buildWindow     Function for building the add window.
 * @param {func}   addProps.handleClose     Function for handling a close event for the add window.
 * @param {string} description              Description used for the tooltip on the add button.
 * @param {func}   filterProps.buildWindow  Function for building the filter window.
 * @param {func}   filterProps.handleClose  Function for handling a close event for the filter window.
 * @param {bool}   filterProps.isFiltered   Bool that indicates if there are already filters in place (changes icon).
 * @param {func}   searchProps.handleSearch Function that is kicked off anytime the value of the searchbox is modified.
 * @param {string} searchProps.initialValue The initial value of the search bar.
 * @param {string} searchProps.placeholder  The text that will show in the searchbox until a search string is entered.
 * @param {string} title                    The title for the parent table.
 * @returns A new instance of the TableToolbar.
 */
const TableToolbar = ({ addProps, description, filterProps, searchProps, title }) => {
  const [isAddOpen, setIsAddOpen] = React.useState(false);
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);

  const handleAddClose = (newObject) => addProps.handleClose(newObject, () => setIsAddOpen(false));
  const handleFilterClose = () => {
    setIsFilterOpen(false);
    filterProps.handleClose();
  };

  return (
    <>
      <Toolbar>
        <Typography component="div" sx={{ flex: "1 1 100%" }} variant="h3">
          {title}
        </Typography>
        {searchProps ? (
          <TextField
            fullWidth
            InputProps={searchbarInputProps}
            onChange={searchProps.handleSearch}
            placeholder={searchProps.placeholder}
            value={searchProps.initialValue}
            variant="standard"
          />
        ) : null}
        {filterProps ? (
          <Tooltip title="Show Advanced Filters">
            <IconButton data-testid="titlebar-filter" onClick={() => setIsFilterOpen(true)}>
              {filterProps.isFiltered ? <FilterAlt /> : <FilterAltOutlined />}
            </IconButton>
          </Tooltip>
        ) : null}{" "}
        {addProps ? (
          <Tooltip title={`Add New ${description}`}>
            <IconButton data-testid="titlebar-add" onClick={() => setIsAddOpen(true)}>
              <AddCircleOutline />
            </IconButton>
          </Tooltip>
        ) : null}
      </Toolbar>
      {addProps && isAddOpen ? addProps.buildDialog(handleAddClose, isAddOpen) : null}
      {filterProps && isFilterOpen ? filterProps.buildDialog(handleFilterClose, isFilterOpen) : null}
    </>
  );
};
TableToolbar.propTypes = {
  addProps: PropTypes.shape({ buildDialog: PropTypes.func.isRequired, handleClose: PropTypes.func.isRequired }),
  description: PropTypes.string.isRequired,
  filterProps: PropTypes.shape({ buildDialog: PropTypes.func.isRequired, handleClose: PropTypes.func.isRequired, isFiltered: PropTypes.bool }),
  searchProps: PropTypes.shape({ handleSearch: PropTypes.func.isRequired, initialValue: PropTypes.string, placeholder: PropTypes.string.isRequired }),
  title: PropTypes.string.isRequired,
};
export default TableToolbar;

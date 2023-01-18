import { FilterList, Search } from "@mui/icons-material";
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
 * @param {func}   filterProps.buildWindow  Function for building the filter window.
 * @param {func}   filterProps.handleClose  Function for handling a close event for the filter window.
 * @param {func}   searchProps.handleSearch Function that is kicked off anytime the value of the searchbox is modified.
 * @param {string} searchProps.placeholder  The text that will show in the searchbox until a search string is entered.
 * @param {string} title                    The title for the parent table.
 * @returns A new instance of the TableToolbar.
 */
const TableToolbar = ({ filterProps, searchProps, title }) => {
  const [filterOpen, setFilterOpen] = React.useState(false);

  const handleFilterClose = () => {
    setFilterOpen(false);
    filterProps.handleClose();
  };

  return (
    <>
      <Toolbar>
        <Typography component="div" sx={{ flex: "1 1 100%" }} variant="h3">
          {title}
        </Typography>
        {searchProps ? (
          <TextField fullWidth InputProps={searchbarInputProps} onChange={searchProps.handleSearch} placeholder={searchProps.placeholder} variant="standard" />
        ) : null}
        {/*<Tooltip title="Add New Player">
        <IconButton>
          <AddCircleOutline />
        </IconButton>
      </Tooltip>*/}
        {filterProps ? (
          <Tooltip title="Show Advanced Filters">
            <IconButton data-testid="titlebar-filter" onClick={() => setFilterOpen(true)}>
              <FilterList />
            </IconButton>
          </Tooltip>
        ) : null}
      </Toolbar>
      {filterProps && filterOpen ? filterProps.buildDialog(handleFilterClose, filterOpen) : null}
    </>
  );
};
TableToolbar.propTypes = {
  filterProps: PropTypes.shape({ buildDialog: PropTypes.func.isRequired, handleClose: PropTypes.func.isRequired }),
  searchProps: PropTypes.shape({ handleSearch: PropTypes.func.isRequired, placeholder: PropTypes.string.isRequired }),
  title: PropTypes.string.isRequired,
};
export default TableToolbar;

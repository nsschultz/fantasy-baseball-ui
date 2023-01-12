import { Input, Toolbar, Typography } from "@mui/material";

import PropTypes from "prop-types";
import React from "react";

/**
 * Wrapper around the Toolbar that supports filtering and adding rows.
 * @param {string} title The title for the parent table.
 * @returns A new instance of the TableToolbar.
 */
const TableToolbar = ({ searchProps, title }) => {
  //const [filterVisible, setFilterVisible] = useState(false);
  //const handleFilterVisible = () => setFilterVisible(!filterVisible);
  return (
    <Toolbar>
      <Typography component="div" sx={{ flex: "1 1 100%" }} variant="h3">
        {title}
      </Typography>
      {searchProps ? <Input fullWidth onChange={searchProps.handleSearch} placeholder={searchProps.placeholder} /> : null}
      {/*<Tooltip title="Add New Player">
        <IconButton>
          <AddCircleOutline />
        </IconButton>
      </Tooltip>
      <Tooltip title={`${filterVisible ? "Hide" : "Show"} Filters`}>
        <IconButton onClick={handleFilterVisible}>
          <FilterList />
        </IconButton>
      </Tooltip> */}
    </Toolbar>
  );
};
TableToolbar.propTypes = {
  searchProps: PropTypes.shape({ handleSearch: PropTypes.func.isRequired, placeholder: PropTypes.string.isRequired }),
  title: PropTypes.string.isRequired,
};
export default TableToolbar;

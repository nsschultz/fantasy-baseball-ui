import { AddCircleOutline, FilterAlt, FilterAltOutlined, Search } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField, Toolbar, Tooltip, Typography } from "@mui/material";
import { RowValue, TableToolbarProps } from "../../types/table-types";

import React from "react";

const searchbarInputProps = {
  startAdornment: (
    <InputAdornment position="start">
      <Search />
    </InputAdornment>
  ),
};

export default function TableToolbar<T extends RowValue>({ addProps, description, filterProps, searchProps, title }: Readonly<TableToolbarProps<T>>) {
  const [isAddOpen, setIsAddOpen] = React.useState(false);
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);

  const handleAddClose = (newObject?: T) => addProps?.handleClose(newObject, () => setIsAddOpen(false));

  const handleFilterClose = () => {
    setIsFilterOpen(false);
    filterProps?.handleClose();
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
        ) : null}
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
}

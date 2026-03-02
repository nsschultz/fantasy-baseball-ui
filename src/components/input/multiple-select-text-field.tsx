import { Checkbox, ListItemText, MenuItem } from "@mui/material";

import React from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import { StyledTextField } from "../styled/styled-text-field";

interface DisplayProps {
  disableChecker?: (menuItems: Record<string, unknown>, selectedValues?: string[], key?: string) => boolean;
  label?: string;
  listItemBuilder: (menuItems: Record<string, unknown>, key: string) => React.ReactNode;
  textValueBuilder: () => React.ReactNode;
}

interface MultipleSelectTextFieldProps {
  displayProps: DisplayProps;
  field: string;
  handleOnChange: (value: string[] | string) => void;
  menuItems: Record<string, unknown>;
  selectedValues?: string[];
}

export default function MultipleSelectTextField({ displayProps, field, handleOnChange, menuItems, selectedValues }: MultipleSelectTextFieldProps) {
  return (
    <StyledTextField
      data-testid={field}
      fullWidth
      id={field}
      label={displayProps.label}
      select
      SelectProps={{
        multiple: true,
        onChange: (event: SelectChangeEvent<string[]>) => handleOnChange(event.target.value as unknown as string[]),
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
}

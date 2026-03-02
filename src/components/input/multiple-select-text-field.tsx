import { Checkbox, ListItemText, MenuItem } from "@mui/material";

import React from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import { StyledTextField } from "../styled/styled-text-field";

interface DisplayProps<T> {
  readonly disableChecker?: (menuItems: Record<string, T>, selectedValues?: string[], key?: string) => boolean;
  readonly label?: string;
  readonly listItemBuilder: (menuItems: Record<string, T>, key: string) => React.ReactNode;
  readonly textValueBuilder: () => React.ReactNode;
}

interface MultipleSelectTextFieldProps<T> {
  readonly displayProps: DisplayProps<T>;
  readonly field: string;
  readonly handleOnChange: (value: string[] | string) => void;
  readonly menuItems: Record<string, T>;
  readonly selectedValues?: string[];
}

export default function MultipleSelectTextField<T>(props: Readonly<MultipleSelectTextFieldProps<T>>) {
  return (
    <StyledTextField
      data-testid={props.field}
      fullWidth
      id={props.field}
      label={props.displayProps.label}
      select
      SelectProps={{
        multiple: true,
        onChange: (event: SelectChangeEvent<string[]>) => props.handleOnChange(event.target.value as string[]),
        renderValue: () => props.displayProps.textValueBuilder(),
        value: props.selectedValues || [],
      }}
      size="small"
      variant="filled"
    >
      {Object.keys(props.menuItems).map((key) => (
        <MenuItem disabled={props.displayProps.disableChecker?.(props.menuItems, props.selectedValues, key)} key={key} value={key}>
          <Checkbox checked={(props.selectedValues || []).includes(key.toString())} color="secondary" />
          <ListItemText primary={props.displayProps.listItemBuilder(props.menuItems, key)} />
        </MenuItem>
      ))}
    </StyledTextField>
  );
}

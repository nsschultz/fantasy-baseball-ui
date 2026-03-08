import { Checkbox, ListItemText, MenuItem } from "@mui/material";

import { MultipleSelectTextFieldProps } from "../../types/input-types";
import { SelectChangeEvent } from "@mui/material/Select";
import { StyledTextField } from "../styled/styled-text-field";

export default function MultipleSelectTextField<T>(props: Readonly<MultipleSelectTextFieldProps<T>>) {
  const { displayProps, field, handleOnChange, menuItems, selectedValues } = props;
  return (
    <StyledTextField
      data-testid={field}
      fullWidth
      id={field}
      label={displayProps.label}
      select
      SelectProps={{
        multiple: true,
        onChange: (event: SelectChangeEvent<string[]>) => handleOnChange(event.target.value as string[]),
        renderValue: () => displayProps.textValueBuilder(),
        value: selectedValues || [],
      }}
      size="small"
      variant="filled"
    >
      {Object.keys(menuItems).map((key) => (
        <MenuItem disabled={displayProps.disableChecker?.(menuItems, selectedValues, key)} key={key} value={key}>
          <Checkbox checked={(selectedValues || []).includes(key.toString())} color="secondary" />
          <ListItemText primary={displayProps.listItemBuilder(menuItems, key)} />
        </MenuItem>
      ))}
    </StyledTextField>
  );
}

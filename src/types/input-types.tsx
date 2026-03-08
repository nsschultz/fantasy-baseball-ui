export interface DisplayProps<T> {
  readonly disableChecker?: (menuItems: Record<string, T>, selectedValues?: string[], key?: string) => boolean;
  readonly label?: string;
  readonly listItemBuilder: (menuItems: Record<string, T>, key: string) => React.ReactNode;
  readonly textValueBuilder: () => React.ReactNode;
}

export interface MultipleSelectTextFieldProps<T> {
  readonly displayProps: DisplayProps<T>;
  readonly field: string;
  readonly handleOnChange: (value: string[] | string) => void;
  readonly menuItems: Record<string, T>;
  readonly selectedValues?: string[];
}

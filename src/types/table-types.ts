import { SortDirection } from "@mui/material";

export type RowValue = { id: React.Key } & Record<string, RowValueType>;
export type RowValueType = number | object | string;

export interface ChildRowProps<T extends RowValue> {
  readonly columnSelector: (row: T) => ReadonlyArray<TableColumnProps<T>>;
  readonly description: string;
  readonly rowKeyBuilder: (row: T) => React.Key;
  readonly rowSelector: (row: T) => ReadonlyArray<T>;
  readonly title: string;
}

export interface ChildTableProps<T extends RowValue> {
  readonly columns: ReadonlyArray<TableColumnProps<T>>;
  readonly description: string;
  readonly rowKeyBuilder: (row: T) => React.Key;
  readonly rows: ReadonlyArray<T>;
  readonly title: string;
}

export interface CustomTableRowProps<T extends RowValue> {
  readonly childProps?: ChildTableProps<T>;
  readonly columns: ReadonlyArray<TableColumnProps<T>>;
  readonly description?: string;
  readonly handleDeleteOpen?: (values: T) => void;
  readonly handleEditOpen?: (values: T) => void;
  readonly values: T;
}

export interface DialogProps<T> {
  readonly buildDialog: (handleClose: (object: T) => void, isOpen: boolean, row?: T) => React.ReactNode;
  readonly handleClose: (object: T, onClose: (object?: T) => void) => void;
}

export interface FilterProps {
  readonly buildDialog: (handleClose: () => void, isOpen: boolean) => React.ReactNode;
  readonly handleClose: () => void;
  readonly isFiltered?: boolean;
}
export interface ParentTableProps<T extends RowValue> {
  readonly childProps?: ChildRowProps<T>;
  readonly columns: ReadonlyArray<TableColumnProps<T>>;
  readonly deleteProps?: DialogProps<T>;
  readonly description: string;
  readonly editProps?: DialogProps<T>;
  readonly sortComparator: (obj1: T, obj2: T, key: string | null) => number;
  readonly toolbarProps?: TableToolbarProps<T>;
  readonly values: ReadonlyArray<T>;
}

export interface SearchProps {
  readonly handleSearch: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  readonly initialValue?: string;
  readonly placeholder: string;
}

export interface TableColumnProps<T extends Record<string, RowValueType>> {
  readonly align?: "left" | "right" | "center" | "justify" | "inherit";
  readonly field: keyof T & string;
  readonly format?: (value: RowValueType) => RowValueType;
  readonly sortComparator?: (obj1: T, obj2: T, key: string | null) => number;
  readonly title: string;
}

export interface TableHeaderProps<T extends RowValue> {
  readonly column: TableColumnProps<T>;
  readonly handleSortRequest: (event: React.MouseEvent<unknown>) => void;
  readonly order?: SortDirection;
  readonly orderBy?: string;
}

export interface TableToolbarProps<T extends RowValue> {
  readonly addProps?: DialogProps<T>;
  readonly description: string;
  readonly filterProps?: FilterProps;
  readonly searchProps?: SearchProps;
  readonly title: string;
}

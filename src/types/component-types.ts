import { BaseEntity, ValueType } from "./basic-types";

import { ReactNode } from "react";
import { SortDirection } from "@mui/material";

export interface ChildRowProps<T extends BaseEntity> {
  readonly columnSelector: (row: T) => ReadonlyArray<TableColumnProps<T>>;
  readonly description: string;
  readonly rowKeyBuilder: (row: T) => React.Key;
  readonly rowSelector: (row: T) => ReadonlyArray<T>;
  readonly title: string;
}

export interface ChildTableProps<T extends BaseEntity> {
  readonly columns: ReadonlyArray<TableColumnProps<T>>;
  readonly description: string;
  readonly rowKeyBuilder: (row: T) => React.Key;
  readonly rows: ReadonlyArray<T>;
  readonly title: string;
}

export interface CustomCardProps {
  readonly additionalContent?: ReactNode;
  readonly content: ReactNode;
  readonly title: string;
}

export interface CustomTableRowProps<T extends BaseEntity> {
  readonly childProps?: ChildTableProps<T>;
  readonly columns: ReadonlyArray<TableColumnProps<T>>;
  readonly description?: string;
  readonly handleDeleteOpen?: (values: T) => void;
  readonly handleEditOpen?: (values: T) => void;
  readonly values: T;
}

export interface DialogProps<T extends BaseEntity> {
  readonly buildDialog: (handleClose: (object: T) => void, isOpen: boolean, row?: T) => React.ReactNode;
  readonly handleClose: (object: T, onClose: (object?: T) => void) => void;
}

export interface DisplayProps<T> {
  readonly disableChecker?: (menuItems: Record<string, T>, selectedValues?: string[], key?: string) => boolean;
  readonly label?: string;
  readonly listItemBuilder: (menuItems: Record<string, T>, key: string) => React.ReactNode;
  readonly textValueBuilder: () => React.ReactNode;
}

export interface FilterProps {
  readonly buildDialog: (handleClose: () => void, isOpen: boolean) => React.ReactNode;
  readonly handleClose: () => void;
  readonly isFiltered?: boolean;
}

export interface IntegrationCardProps {
  readonly description: string;
  readonly integrationButton: ReactNode;
  readonly title: string;
}

export interface LayoutProps {
  readonly isLoggedIn: boolean;
}

export interface MultipleSelectTextFieldProps<T> {
  readonly displayProps: DisplayProps<T>;
  readonly field: string;
  readonly handleOnChange: (value: string[] | string) => void;
  readonly menuItems: Record<string, T>;
  readonly selectedValues?: string[];
}

export interface NavigationItemProps {
  readonly href: string;
  readonly icon: React.ElementType;
  readonly title: string;
}

export interface ParentTableProps<T extends BaseEntity> {
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

export interface SidebarProps {
  readonly onMobileClose: () => void;
  readonly openMobile: boolean;
}

export interface TableColumnProps<T extends Record<string, ValueType>> {
  readonly align?: "left" | "right" | "center" | "justify" | "inherit";
  readonly field: keyof T & string;
  readonly format?: (value: ValueType) => ValueType;
  readonly sortComparator?: (obj1: T, obj2: T, key: string | null) => number;
  readonly title: string;
}

export interface TableHeaderProps<T extends BaseEntity> {
  readonly column: TableColumnProps<T>;
  readonly handleSortRequest: (event: React.MouseEvent<unknown>) => void;
  readonly order?: SortDirection;
  readonly orderBy?: string;
}

export interface TableToolbarProps<T extends BaseEntity> {
  readonly addProps?: DialogProps<T>;
  readonly description: string;
  readonly filterProps?: FilterProps;
  readonly searchProps?: SearchProps;
  readonly title: string;
}

export interface TitlebarProps {
  readonly isLoggedIn: boolean;
  readonly onOpenMobileNavigation: () => void;
}

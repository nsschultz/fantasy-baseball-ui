import { BaseEntity, ValueType } from "./basic-types";

import { ReactNode } from "react";
import { SortDirection } from "@mui/material";

export interface ChildRowProps<T extends BaseEntity> {
  columnSelector: (row: T) => Array<TableColumnProps<T>>;
  description: string;
  rowKeyBuilder: (row: T) => React.Key;
  rowSelector: (row: T) => Array<T>;
  title: string;
}

export interface ChildTableProps<T extends BaseEntity> {
  columns: Array<TableColumnProps<T>>;
  description: string;
  rowKeyBuilder: (row: T) => React.Key;
  rows: Array<T>;
  title: string;
}

export interface CustomCardProps {
  additionalContent?: ReactNode;
  content: ReactNode;
  title: string;
}

export interface CustomTableRowProps<T extends BaseEntity> {
  childProps?: ChildTableProps<T>;
  columns: ReadonlyArray<TableColumnProps<T>>;
  description?: string;
  handleDeleteOpen?: (values: T) => void;
  handleEditOpen?: (values: T) => void;
  values: T;
}

export interface DialogImplProps<T extends BaseEntity> {
  onClose: (object?: T) => void;
  open: boolean;
}

export interface DialogProps<T extends BaseEntity> {
  buildDialog: (handleClose: (object: T) => void, isOpen: boolean, row?: T) => React.ReactNode;
  handleClose: (object: T, onClose: (object?: T) => void) => void;
}

export interface DisplayProps<T> {
  disableChecker?: (menuItems: Record<string, T>, selectedValues?: string[], key?: string) => boolean;
  label?: string;
  listItemBuilder: (menuItems: Record<string, T>, key: string) => React.ReactNode;
  textValueBuilder: () => React.ReactNode;
}

export interface FilterProps {
  buildDialog: (handleClose: () => void, isOpen: boolean) => React.ReactNode;
  handleClose: () => void;
  isFiltered?: boolean;
}

export interface IntegrationCardProps {
  description: string;
  integrationButton: ReactNode;
  title: string;
}

export interface LayoutProps {
  isLoggedIn: boolean;
}

export interface MultipleSelectTextFieldProps<T> {
  displayProps: DisplayProps<T>;
  field: string;
  handleOnChange: (value: string[] | string) => void;
  menuItems: Record<string, T>;
  selectedValues?: string[];
}

export interface NavigationItemProps {
  href: string;
  icon: React.ElementType;
  title: string;
}

export interface ParentTableProps<T extends BaseEntity> {
  childProps?: ChildRowProps<T>;
  columns: Array<TableColumnProps<T>>;
  deleteProps?: DialogProps<T>;
  description: string;
  editProps?: DialogProps<T>;
  sortComparator: (obj1: T, obj2: T, key: string | null) => number;
  toolbarProps?: TableToolbarProps<T>;
  values: Array<T>;
}

export interface SearchProps {
  handleSearch: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  initialValue?: string;
  placeholder: string;
}

export interface SidebarProps {
  onMobileClose: () => void;
  openMobile: boolean;
}

export interface TableColumnProps<T extends Record<string, ValueType>> {
  align?: "left" | "right" | "center" | "justify" | "inherit";
  field: keyof T & string;
  format?: (value: ValueType) => ValueType;
  sortComparator?: (obj1: T, obj2: T, key: string | null) => number;
  title: string;
}

export interface TableHeaderProps<T extends BaseEntity> {
  column: TableColumnProps<T>;
  handleSortRequest: (event: React.MouseEvent<unknown>) => void;
  order?: SortDirection;
  orderBy?: string;
}

export interface TableToolbarProps<T extends BaseEntity> {
  addProps?: DialogProps<T>;
  description: string;
  filterProps?: FilterProps;
  searchProps?: SearchProps;
  title: string;
}

export interface TitlebarProps {
  isLoggedIn: boolean;
  onOpenMobileNavigation: () => void;
}

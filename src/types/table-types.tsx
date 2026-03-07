export type RowValue = { id: React.Key } & Record<string, unknown>;
export type RowValueType = number | string;
export type SortOrder = "asc" | "desc";

export interface DialogProps<T> {
  readonly buildDialog: (handleClose: (object: T) => void, isOpen: boolean, row?: T) => React.ReactNode;
  readonly handleClose: (object: T, onClose: (object?: T) => void) => void;
}

export interface FilterProps {
  readonly buildDialog: (handleClose: () => void, isOpen: boolean) => React.ReactNode;
  readonly handleClose: () => void;
  readonly isFiltered?: boolean;
}

export interface SearchProps {
  readonly handleSearch: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  readonly initialValue?: string;
  readonly placeholder: string;
}

import { DialogProps, FilterProps, SearchProps, TableToolbarProps } from "../../types/component-types";
import { fireEvent, render, screen } from "@testing-library/react";

import { BaseEntity } from "../../types/basic-types";
import React from "react";
import TableToolbar from "./table-toolbar";

const addProps = (onClose: () => void): DialogProps<BaseEntity> => ({
  buildDialog: (handleAddClose: (object: BaseEntity) => void, addOpen: boolean, row: BaseEntity) => {
    if (addOpen) handleAddClose(row);
    return null;
  },
  handleClose: onClose,
});

const filterProps = (onClose: () => void, isFiltered: boolean): FilterProps => ({
  buildDialog: (handleFilterClose: () => void, filterOpen: boolean) => {
    if (filterOpen) handleFilterClose();
    return null;
  },
  handleClose: onClose,
  isFiltered: isFiltered,
});

const TestWrapper = (props: Readonly<TableToolbarProps<BaseEntity>>) => <TableToolbar {...props} />;

describe("TableToolbar", () => {
  describe("should render", () => {
    test("with all extras", () => {
      const aProps = addProps(() => undefined);
      const fProps = filterProps(() => undefined, false);
      const sProps: SearchProps = { handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => e, placeholder: "MyPlaceHolder" };
      render(<TestWrapper addProps={aProps} description={"MyDescription"} filterProps={fProps} searchProps={sProps} title="MyTitle" />);
      expect(screen.getByText("MyTitle")).toBeVisible();
      expect(screen.getByRole("textbox")).toBeVisible();
      expect(screen.getAllByRole("button").length).toEqual(2);
      expect(screen.getByTestId("FilterAltOutlinedIcon")).toBeVisible();
      expect(screen.queryByTestId("FilterAltIcon")).toBeFalsy();
    });
    test("with filter already applied", () => {
      const aProps = addProps(() => undefined);
      const fProps = filterProps(() => undefined, true);
      const sProps: SearchProps = { handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => e, placeholder: "MyPlaceHolder" };
      render(<TestWrapper addProps={aProps} description={"MyDescription"} filterProps={fProps} searchProps={sProps} title="MyTitle" />);
      expect(screen.getByText("MyTitle")).toBeVisible();
      expect(screen.getByRole("textbox")).toBeVisible();
      expect(screen.getAllByRole("button").length).toEqual(2);
      expect(screen.queryByTestId("FilterAltOutlinedIcon")).toBeFalsy();
      expect(screen.getByTestId("FilterAltIcon")).toBeVisible();
    });
    test("without any extras", () => {
      render(<TestWrapper addProps={undefined} description={"MyDescription"} filterProps={undefined} searchProps={undefined} title="MyTitle" />);
      expect(screen.getByText("MyTitle")).toBeVisible();
      expect(screen.queryByRole("textbox")).toBeFalsy();
      expect(screen.queryByRole("button")).toBeFalsy();
    });
  });
  test("should handle adding", () => {
    let value = "";
    const props = addProps(() => (value = "add closed"));
    render(<TestWrapper addProps={props} description={"MyDescription"} filterProps={undefined} searchProps={undefined} title="MyTitle" />);
    fireEvent.click(screen.getByRole("button"));
    expect(value).toEqual("add closed");
  });
  test("should handle filtering", () => {
    let value = "";
    const props = filterProps(() => (value = "filter closed"), false);
    render(<TestWrapper addProps={undefined} description={"MyDescription"} filterProps={props} searchProps={undefined} title="MyTitle" />);
    fireEvent.click(screen.getByRole("button"));
    expect(value).toEqual("filter closed");
  });
  test("should handle searching", () => {
    const searchText = "searching";
    const searchProps: SearchProps = {
      handleSearch: (e: { target: { value: string } }) => expect(e.target.value).toEqual(searchText),
      placeholder: "MyPlaceHolder",
    };
    render(<TestWrapper addProps={undefined} description={"MyDescription"} filterProps={undefined} searchProps={searchProps} title="MyTitle" />);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: searchText } });
  });
});

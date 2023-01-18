import { fireEvent, render, screen } from "@testing-library/react";

import TableToolbar from "./table-toolbar";

const TestWrapper = ({ filterProps, searchProps, title }) => <TableToolbar filterProps={filterProps} searchProps={searchProps} title={title} />;

describe("TableToolbar", () => {
  describe("should render", () => {
    test("with all extras", () => {
      const filterProps = { buildDialog: (e) => e, handleClose: () => {} };
      const searchProps = { handleSearch: (e) => e, placeholder: "MyPlaceHolder" };
      render(<TestWrapper filterProps={filterProps} searchProps={searchProps} title="MyTitle" />);
      expect(screen.getByText("MyTitle")).toBeVisible();
      expect(screen.getByRole("textbox")).toBeVisible();
      expect(screen.getByRole("button")).toBeVisible();
    });
    test("without any extras", () => {
      render(<TestWrapper title="MyTitle" />);
      expect(screen.getByText("MyTitle")).toBeVisible();
      expect(screen.queryByRole("textbox")).toBeFalsy();
      expect(screen.queryByRole("button")).toBeFalsy();
    });
  });
  test("should handle filtering", () => {
    let value = "";
    const filterProps = {
      buildDialog: (handleFilterClose, filterOpen) => {
        if (filterOpen) handleFilterClose();
      },
      handleClose: () => (value = "filter closed"),
    };
    render(<TestWrapper filterProps={filterProps} title="MyTitle" />);
    fireEvent.click(screen.getByRole("button"));
    expect(value).toEqual("filter closed");
  });
  test("should handle searching", () => {
    const searchText = "searching";
    const searchProps = { handleSearch: (e) => expect(e.target.value).toEqual(searchText), placeholder: "MyPlaceHolder" };
    render(<TestWrapper searchProps={searchProps} title="MyTitle" />);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: searchText } });
  });
});

import { fireEvent, render, screen } from "@testing-library/react";

import TableToolbar from "./table-toolbar";

const TestWrapper = ({ searchProps, title }) => <TableToolbar searchProps={searchProps} title={title} />;

describe("TableToolbar", () => {
  describe("should render", () => {
    test("with toolbar", () => {
      const searchProps = { handleSearch: (e) => e, placeholder: "MyPlaceHolder" };
      render(<TestWrapper searchProps={searchProps} title="MyTitle" />);
      expect(screen.getByText("MyTitle")).toBeVisible();
      expect(screen.getByRole("textbox")).toBeVisible();
    });
    test("without toolbar", () => {
      render(<TestWrapper title="MyTitle" />);
      expect(screen.getByText("MyTitle")).toBeVisible();
      expect(screen.queryByRole("textbox")).toBeFalsy();
    });
  });
  test("should handle searching", () => {
    const searchText = "searching";
    const searchProps = { handleSearch: (e) => expect(e.target.value).toEqual(searchText), placeholder: "MyPlaceHolder" };
    render(<TestWrapper searchProps={searchProps} title="MyTitle" />);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: searchText } });
  });
});

import { fireEvent, render, screen } from "@testing-library/react";

import CustomSelectField from "./custom-select-field";
import GlobalTheme from "../global-theme";
import { ThemeProvider } from "@mui/material";

const existingField = "TestField";
let existingValue = "Old";
const lookupValues = { 0: "Available", 1: "Rostered", 2: "Unavailable", 3: "Scouted" };
const title = "Select Title";

const onHandleFilterChange = (event) => (existingValue = event.target.value);

const TestWrapper = ({ existingValues, title, width }) => (
  <ThemeProvider theme={GlobalTheme()}>
    <CustomSelectField
      existingValues={existingValues}
      field={existingField}
      handleOnChange={onHandleFilterChange}
      lookup={lookupValues}
      title={title}
      width={width}
    />
  </ThemeProvider>
);

describe("CustomSelectField", () => {
  describe("should render", () => {
    test("with a title", () => {
      render(<TestWrapper existingValues={undefined} title={title} width={undefined} />);
      expect(screen.getByText(title)).toBeInTheDocument();
    });
    test("without a title", () => {
      render(<TestWrapper existingValues={[]} title={undefined} width={undefined} />);
      expect(screen.queryByText(title)).toBeFalsy();
    });
    test("with a list of the items", () => {
      render(<TestWrapper existingValues={[]} title={title} width={undefined} />);
      const customSelect = screen.getByRole("button");
      fireEvent.keyDown(customSelect, { key: "ArrowDown" });
      expect(screen.getByText("Available")).toBeVisible();
      expect(screen.getByText("Rostered")).toBeVisible();
      expect(screen.getByText("Unavailable")).toBeVisible();
      expect(screen.getByText("Scouted")).toBeVisible();
    });
    test("with fields already selected", () => {
      render(<TestWrapper existingValues={["1", "3"]} title={title} width={125} />);
      expect(screen.getByText("Rostered, Scouted")).toBeVisible();
    });
  });
  test("should handle onChange events", () => {
    render(<TestWrapper existingValues={[]} title={title} width={undefined} />);
    const customSelect = screen.getByRole("button");
    expect(existingValue).toBe("Old");
    fireEvent.keyDown(customSelect, { key: "ArrowDown" });
    fireEvent.click(screen.getByText("Available"));
    fireEvent.keyDown(customSelect, { key: "ArrowDown" });
    fireEvent.click(screen.getByText("Scouted"));
    expect(existingValue).toEqual(["0", "3"]);
    expect(screen.getByText("Available, Scouted")).toBeVisible();
  });
});

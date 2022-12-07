import { fireEvent, render, screen } from "@testing-library/react";

import CustomSelectField from "../../../components/input/custom-select-field";
import GlobalTheme from "../../../components/global-theme";
import { ThemeProvider } from "@mui/material";

const lookupValues = { 0: "Available", 1: "Rostered", 2: "Unavailable", 3: "Scouted" };
const title = "Select Title";

test("should render with a title", () => {
  render(
    <ThemeProvider theme={GlobalTheme()}>
      <CustomSelectField filterValues={[]} lookup={lookupValues} title={title} />
    </ThemeProvider>
  );
  expect(screen.getByText(title)).toBeInTheDocument();
});

test("should render without a title", () => {
  render(
    <ThemeProvider theme={GlobalTheme()}>
      <CustomSelectField filterValues={[]} lookup={lookupValues} />
    </ThemeProvider>
  );
  expect(screen.queryByText(title)).toBeFalsy();
});

test("should render with a list of the items", async () => {
  render(
    <ThemeProvider theme={GlobalTheme()}>
      <CustomSelectField filterValues={[]} lookup={lookupValues} title={title} />
    </ThemeProvider>
  );
  const customSelect = screen.getByRole("button");
  fireEvent.keyDown(customSelect, { key: "ArrowDown" });
  expect(await screen.findByText("Available")).toBeVisible();
  expect(await screen.findByText("Rostered")).toBeVisible();
  expect(await screen.findByText("Unavailable")).toBeVisible();
  expect(await screen.findByText("Scouted")).toBeVisible();
});

test("should render with fields already selected", () => {
  const filterValues = ["1", "3"];
  render(
    <ThemeProvider theme={GlobalTheme()}>
      <CustomSelectField filterValues={filterValues} lookup={lookupValues} title={title} width={125} />
    </ThemeProvider>
  );
  expect(screen.getByText("Rostered, Scouted")).toBeVisible();
});

test("should handle onChange events", async () => {
  const onHandleFilterChange = (event) => (existingValue = event.target.value);
  let existingField = "TestField";
  let existingValue = "Old";
  render(
    <ThemeProvider theme={GlobalTheme()}>
      <CustomSelectField field={existingField} lookup={lookupValues} onHandleFilterChange={onHandleFilterChange} title={title} />
    </ThemeProvider>
  );
  const customSelect = screen.getByRole("button");
  expect(existingValue).toBe("Old");
  fireEvent.keyDown(customSelect, { key: "ArrowDown" });
  fireEvent.click(await screen.findByText("Available"));
  fireEvent.keyDown(customSelect, { key: "ArrowDown" });
  fireEvent.click(await screen.findByText("Scouted"));
  expect(existingValue).toEqual(["0", "3"]);
  expect(screen.getByText("Available, Scouted")).toBeVisible();
});

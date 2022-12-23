import { cleanup, fireEvent, render, screen } from "@testing-library/react";

import GlobalTheme from "../global-theme";
import MultipleSelectTextField from "./multiple-select-text-field";
import { ThemeProvider } from "@mui/material";
import { useState } from "react";

const positionMap = {
  C: {
    code: "C",
    fullName: "Catcher",
    playerType: 1,
    sortOrder: 0,
    additionalPositions: [{ code: "UTIL", fullName: "Utility", playerType: 1, sortOrder: 13, additionalPositions: [] }],
  },
  "1B": {
    code: "1B",
    fullName: "First Baseman",
    playerType: 1,
    sortOrder: 1,
    additionalPositions: [
      { code: "IF", fullName: "Infielder", playerType: 1, sortOrder: 7, additionalPositions: [] },
      { code: "UTIL", fullName: "Utility", playerType: 1, sortOrder: 13, additionalPositions: [] },
      { code: "CIF", fullName: "Corner Infielder", playerType: 1, sortOrder: 5, additionalPositions: [] },
    ],
  },
  "2B": {
    code: "2B",
    fullName: "Second Baseman",
    playerType: 1,
    sortOrder: 2,
    additionalPositions: [
      { code: "IF", fullName: "Infielder", playerType: 1, sortOrder: 7, additionalPositions: [] },
      { code: "UTIL", fullName: "Utility", playerType: 1, sortOrder: 13, additionalPositions: [] },
      { code: "MIF", fullName: "Middle Infielder", playerType: 1, sortOrder: 6, additionalPositions: [] },
    ],
  },
  "3B": {
    code: "3B",
    fullName: "Third Baseman",
    playerType: 1,
    sortOrder: 3,
    additionalPositions: [
      { code: "IF", fullName: "Infielder", playerType: 1, sortOrder: 7, additionalPositions: [] },
      { code: "CIF", fullName: "Corner Infielder", playerType: 1, sortOrder: 5, additionalPositions: [] },
      { code: "UTIL", fullName: "Utility", playerType: 1, sortOrder: 13, additionalPositions: [] },
    ],
  },
  SS: {
    code: "SS",
    fullName: "Shortstop",
    playerType: 1,
    sortOrder: 4,
    additionalPositions: [
      { code: "IF", fullName: "Infielder", playerType: 1, sortOrder: 7, additionalPositions: [] },
      { code: "MIF", fullName: "Middle Infielder", playerType: 1, sortOrder: 6, additionalPositions: [] },
      { code: "UTIL", fullName: "Utility", playerType: 1, sortOrder: 13, additionalPositions: [] },
    ],
  },
  CIF: {
    code: "CIF",
    fullName: "Corner Infielder",
    playerType: 1,
    sortOrder: 5,
    additionalPositions: [
      { code: "IF", fullName: "Infielder", playerType: 1, sortOrder: 7, additionalPositions: [] },
      { code: "UTIL", fullName: "Utility", playerType: 1, sortOrder: 13, additionalPositions: [] },
    ],
  },
  MIF: {
    code: "MIF",
    fullName: "Middle Infielder",
    playerType: 1,
    sortOrder: 6,
    additionalPositions: [
      { code: "IF", fullName: "Infielder", playerType: 1, sortOrder: 7, additionalPositions: [] },
      { code: "UTIL", fullName: "Utility", playerType: 1, sortOrder: 13, additionalPositions: [] },
    ],
  },
  IF: {
    code: "IF",
    fullName: "Infielder",
    playerType: 1,
    sortOrder: 7,
    additionalPositions: [{ code: "UTIL", fullName: "Utility", playerType: 1, sortOrder: 13, additionalPositions: [] }],
  },
  LF: {
    code: "LF",
    fullName: "Left Fielder",
    playerType: 1,
    sortOrder: 8,
    additionalPositions: [
      { code: "OF", fullName: "Outfielder", playerType: 1, sortOrder: 11, additionalPositions: [] },
      { code: "UTIL", fullName: "Utility", playerType: 1, sortOrder: 13, additionalPositions: [] },
    ],
  },
  CF: {
    code: "CF",
    fullName: "Center Feilder",
    playerType: 1,
    sortOrder: 9,
    additionalPositions: [
      { code: "UTIL", fullName: "Utility", playerType: 1, sortOrder: 13, additionalPositions: [] },
      { code: "OF", fullName: "Outfielder", playerType: 1, sortOrder: 11, additionalPositions: [] },
    ],
  },
  RF: {
    code: "RF",
    fullName: "Right Fielder",
    playerType: 1,
    sortOrder: 10,
    additionalPositions: [
      { code: "OF", fullName: "Outfielder", playerType: 1, sortOrder: 11, additionalPositions: [] },
      { code: "UTIL", fullName: "Utility", playerType: 1, sortOrder: 13, additionalPositions: [] },
    ],
  },
  OF: {
    code: "OF",
    fullName: "Outfielder",
    playerType: 1,
    sortOrder: 11,
    additionalPositions: [{ code: "UTIL", fullName: "Utility", playerType: 1, sortOrder: 13, additionalPositions: [] }],
  },
  DH: {
    code: "DH",
    fullName: "Designated Hitter",
    playerType: 1,
    sortOrder: 12,
    additionalPositions: [{ code: "UTIL", fullName: "Utility", playerType: 1, sortOrder: 13, additionalPositions: [] }],
  },
  UTIL: { code: "UTIL", fullName: "Utility", playerType: 1, sortOrder: 13, additionalPositions: [] },
};
let startValues = ["2B", "3B"];

const disableChecker = (menuItems, selectedValues, key) => selectedValues.some((v) => menuItems[v].additionalPositions.some((ap) => ap.code === key));
const lineItemBuilder = (lookup, key) => lookup[key].fullName;
const textValueBuilder = () => startValues.map((selected) => positionMap[selected].code).join();

afterEach(cleanup);
afterEach(() => (startValues = ["2B", "3B"]));

const TestWrapper = ({ disableChecker, selectedValues }) => {
  const [stateValues, setStateValues] = useState(selectedValues);
  return (
    <ThemeProvider theme={GlobalTheme()}>
      <MultipleSelectTextField
        displayProps={{ disableChecker: disableChecker, label: "Position(s)", listItemBuilder: lineItemBuilder, textValueBuilder: textValueBuilder }}
        field="positions"
        handleOnChange={(values) => {
          setStateValues(values);
          startValues = values;
        }}
        menuItems={positionMap}
        selectedValues={stateValues}
      />
    </ThemeProvider>
  );
};

describe("MultiSelectTextField", () => {
  describe("should render with", () => {
    test("a valid label", () => {
      render(<TestWrapper disableChecker={undefined} selectedValues={undefined} />);
      expect(screen.getByLabelText("Position(s)")).toBeVisible();
    });
    test("a valid value", () => {
      render(<TestWrapper disableChecker={undefined} selectedValues={startValues} />);
      expect(screen.getByText("2B,3B")).toBeVisible();
    });
    test("with disabled values", () => {
      render(<TestWrapper disableChecker={disableChecker} selectedValues={startValues} />);
      const customSelect = screen.getByRole("button");
      fireEvent.keyDown(customSelect, { key: "ArrowDown" });
      expect(screen.getByRole("option", { name: "Second Baseman" })).not.toHaveAttribute("aria-disabled");
      expect(screen.getByRole("option", { name: "Shortstop" })).not.toHaveAttribute("aria-disabled");
      expect(screen.getByRole("option", { name: "Middle Infielder" })).toHaveAttribute("aria-disabled");
    });
    test("without disabled values", () => {
      render(<TestWrapper disableChecker={undefined} selectedValues={startValues} />);
      const customSelect = screen.getByRole("button");
      fireEvent.keyDown(customSelect, { key: "ArrowDown" });
      expect(screen.getByRole("option", { name: "Second Baseman" })).not.toHaveAttribute("aria-disabled");
      expect(screen.getByRole("option", { name: "Shortstop" })).not.toHaveAttribute("aria-disabled");
      expect(screen.getByRole("option", { name: "Middle Infielder" })).not.toHaveAttribute("aria-disabled");
    });
  });
  describe("should change value", () => {
    test("when selecting a new value", () => {
      render(<TestWrapper disableChecker={undefined} selectedValues={startValues} />);
      const customSelect = screen.getByRole("button");
      fireEvent.keyDown(customSelect, { key: "ArrowDown" });
      fireEvent.click(screen.getByText("Shortstop"));
      expect(startValues).toEqual(["2B", "3B", "SS"]);
      expect(screen.getByText("2B,3B,SS")).toBeVisible();
    });
    test("when deselecting an old value", () => {
      render(<TestWrapper disableChecker={undefined} selectedValues={startValues} />);
      const customSelect = screen.getByRole("button");
      fireEvent.keyDown(customSelect, { key: "ArrowDown" });
      fireEvent.click(screen.getByText("Third Baseman"));
      expect(startValues).toEqual(["2B"]);
      expect(screen.getByText("2B")).toBeVisible();
    });
  });
});

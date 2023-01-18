import { buildPositionList, buildPositionMap, isChildPosition, matchAnyPosition } from "./position-helper";

const positions = [
  {
    code: "C",
    fullName: "Catcher",
    playerType: 1,
    sortOrder: 0,
    additionalPositions: [{ code: "UTIL", fullName: "Utility", playerType: 1, sortOrder: 13, additionalPositions: [] }],
  },
  {
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
  {
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
  {
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
  {
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
  {
    code: "CIF",
    fullName: "Corner Infielder",
    playerType: 1,
    sortOrder: 5,
    additionalPositions: [
      { code: "IF", fullName: "Infielder", playerType: 1, sortOrder: 7, additionalPositions: [] },
      { code: "UTIL", fullName: "Utility", playerType: 1, sortOrder: 13, additionalPositions: [] },
    ],
  },
  {
    code: "MIF",
    fullName: "Middle Infielder",
    playerType: 1,
    sortOrder: 6,
    additionalPositions: [
      { code: "IF", fullName: "Infielder", playerType: 1, sortOrder: 7, additionalPositions: [] },
      { code: "UTIL", fullName: "Utility", playerType: 1, sortOrder: 13, additionalPositions: [] },
    ],
  },
  {
    code: "IF",
    fullName: "Infielder",
    playerType: 1,
    sortOrder: 7,
    additionalPositions: [{ code: "UTIL", fullName: "Utility", playerType: 1, sortOrder: 13, additionalPositions: [] }],
  },
  {
    code: "LF",
    fullName: "Left Fielder",
    playerType: 1,
    sortOrder: 8,
    additionalPositions: [
      { code: "OF", fullName: "Outfielder", playerType: 1, sortOrder: 11, additionalPositions: [] },
      { code: "UTIL", fullName: "Utility", playerType: 1, sortOrder: 13, additionalPositions: [] },
    ],
  },
  {
    code: "CF",
    fullName: "Center Feilder",
    playerType: 1,
    sortOrder: 9,
    additionalPositions: [
      { code: "UTIL", fullName: "Utility", playerType: 1, sortOrder: 13, additionalPositions: [] },
      { code: "OF", fullName: "Outfielder", playerType: 1, sortOrder: 11, additionalPositions: [] },
    ],
  },
  {
    code: "RF",
    fullName: "Right Fielder",
    playerType: 1,
    sortOrder: 10,
    additionalPositions: [
      { code: "OF", fullName: "Outfielder", playerType: 1, sortOrder: 11, additionalPositions: [] },
      { code: "UTIL", fullName: "Utility", playerType: 1, sortOrder: 13, additionalPositions: [] },
    ],
  },
  {
    code: "OF",
    fullName: "Outfielder",
    playerType: 1,
    sortOrder: 11,
    additionalPositions: [{ code: "UTIL", fullName: "Utility", playerType: 1, sortOrder: 13, additionalPositions: [] }],
  },
  {
    code: "DH",
    fullName: "Designated Hitter",
    playerType: 1,
    sortOrder: 12,
    additionalPositions: [{ code: "UTIL", fullName: "Utility", playerType: 1, sortOrder: 13, additionalPositions: [] }],
  },
  { code: "UTIL", fullName: "Utility", playerType: 1, sortOrder: 13, additionalPositions: [] },
  {
    code: "SP",
    fullName: "Starting Pitcher",
    playerType: 2,
    sortOrder: 100,
    additionalPositions: [{ code: "P", fullName: "Pitcher", playerType: 2, sortOrder: 102, additionalPositions: [] }],
  },
  {
    code: "RP",
    fullName: "Relief Pitcher",
    playerType: 2,
    sortOrder: 101,
    additionalPositions: [{ code: "P", fullName: "Pitcher", playerType: 2, sortOrder: 102, additionalPositions: [] }],
  },
  { code: "P", fullName: "Pitcher", playerType: 2, sortOrder: 102, additionalPositions: [] },
  { code: "", fullName: "Unknown", playerType: 0, sortOrder: 2147483647, additionalPositions: [] },
];
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
const selectedPositions = [
  {
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
  {
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
];

describe("buildPositionList", () => {
  describe("should return an empty array if", () => {
    test("the codes aren't provided", () => expect(buildPositionList(null, positionMap)).toEqual([]));
    test("the positionMap isn't provided", () => expect(buildPositionList(["2B", "3B"], null)).toEqual([]));
  });
  describe("should return an a valid array", () => {
    test("with inferred positions removed", () => expect(buildPositionList(["2B", "3B", "IF"], positionMap)).toEqual(selectedPositions));
    test("sorted by the sort attribute", () => expect(buildPositionList(["3B", "2B"], positionMap)).toEqual(selectedPositions));
  });
});
describe("buildPositionMap", () => {
  describe("should buy a position with", () => {
    test("for all positions", () => expect(Object.values(buildPositionMap(positions))).toEqual(positions));
    test("for a specific type", () => expect(buildPositionMap(positions, 1)).toEqual(positionMap));
  });
});
describe("isChildPosition", () => {
  describe("returns false if", () => {
    test("the position map is not supplied", () => expect(isChildPosition(null, ["2B", "3B"], "MIF")).toBeFalsy());
    test("the position map is empty", () => expect(isChildPosition({}, ["2B", "3B"], "MIF")).toBeFalsy());
    test("the selected values are not supplied", () => expect(isChildPosition(positionMap, null, "MIF")).toBeFalsy());
    test("the selected values are not empty", () => expect(isChildPosition(positionMap, [], "MIF")).toBeFalsy());
    test("the key is not supplied", () => expect(isChildPosition(positionMap, ["2B", "3B"], null)).toBeFalsy());
    test("the key is empty", () => expect(isChildPosition(positionMap, ["2B", "3B"], "")).toBeFalsy());
    test("the key isn't found in the additional positions", () => expect(isChildPosition(positionMap, ["2B", "3B"], "OF")).toBeFalsy());
  });
  describe("returns true if", () => {
    test("the key is found in the additional positions of the selected values", () => expect(isChildPosition(positionMap, ["2B", "3B"], "MIF")).toBeTruthy());
  });
});
describe("matchAnyPosition", () => {
  describe("returns false if", () => {
    test("the selected values are not supplied", () => expect(matchAnyPosition(null, "MIF", true)).toBeFalsy());
    test("the selected values are not empty", () => expect(matchAnyPosition([], "MIF", true)).toBeFalsy());
    test("the key is not supplied", () => expect(matchAnyPosition(selectedPositions, null, true)).toBeFalsy());
    test("the key is empty", () => expect(matchAnyPosition(selectedPositions, "", true)).toBeFalsy());
    test("the key isn't found in the additional positions", () => expect(matchAnyPosition(selectedPositions, "OF", true)).toBeFalsy());
    test("the key is matches the parent, but the flag is set to false", () => expect(matchAnyPosition(selectedPositions, "2B", false)).toBeFalsy());
  });
  describe("returns true if", () => {
    test("the key is found in the additional positions of the selected values", () => expect(matchAnyPosition(selectedPositions, "MIF", true)).toBeTruthy());
    test("the key is matches the parent, and the flag is set to true", () => expect(matchAnyPosition(selectedPositions, "2B", true)).toBeTruthy());
  });
});

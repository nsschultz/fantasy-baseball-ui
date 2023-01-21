import { defaultObjectComparator, playerDefaultComparator, playerNameComparator, playerPositionsComparator, playerTeamComparator } from "./sort-comparators";

const obj1 = { matching: 1, different: 1, prop1: 1 };
const obj2 = { matching: 1, different: 2, prop2: 1 };
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

describe("defaultObjectComparator", () => {
  describe("should return 0", () => {
    test("if the objects are the same", () => expect(defaultObjectComparator(obj1, obj1, "matching")).toEqual(0));
    test("if the objects have the same value for the key", () => expect(defaultObjectComparator(obj1, obj2, "matching")).toEqual(0));
    test("if the objects are both undefined", () => expect(defaultObjectComparator(undefined, undefined, "matching")).toEqual(0));
  });
  describe("should return -1", () => {
    test("if the 2nd object isn't set", () => expect(defaultObjectComparator(obj1, undefined, "matching")).toEqual(-1));
    test("if the 2nd object doesn't have the key", () => expect(defaultObjectComparator(obj1, obj2, "prop1")).toEqual(-1));
    test("if the 1st object has a lesser value", () => expect(defaultObjectComparator(obj2, obj1, "different")).toEqual(-1));
  });
  describe("should return -1", () => {
    test("if the 1st object isn't set", () => expect(defaultObjectComparator(undefined, obj2, "matching")).toEqual(1));
    test("if the 1st object doesn't have the key", () => expect(defaultObjectComparator(obj1, obj2, "prop2")).toEqual(1));
    test("if the 2nd object has a lesser value", () => expect(defaultObjectComparator(obj1, obj2, "different")).toEqual(1));
  });
});
describe("playerDefaultComparator", () => {
  describe("should return zero", () => {
    test("if type, last, first, and id match", () => {
      const player1 = { id: 1, firstName: "first", lastName: "last", type: 1 };
      const player2 = { id: 1, firstName: "first", lastName: "last", type: 1 };
      expect(playerDefaultComparator(player1, player2)).toEqual(0);
    });
    test("if neither player is set", () => expect(playerDefaultComparator()).toEqual(0));
  });
  describe("should return non-zero", () => {
    test("type doesn't match", () => {
      const player1 = { id: 1, firstName: "first", lastName: "last", type: 1 };
      const player2 = { id: 1, firstName: "first", lastName: "last", type: 2 };
      expect(playerDefaultComparator(player1, player2)).toEqual(1);
    });
    test("last name doesn't match", () => {
      const player1 = { id: 1, firstName: "first", lastName: "last", type: 1 };
      const player2 = { id: 1, firstName: "first", lastName: "smith", type: 1 };
      expect(playerDefaultComparator(player1, player2)).toEqual(1);
    });
    test("first name doesn't match", () => {
      const player1 = { id: 1, firstName: "first", lastName: "last", type: 1 };
      const player2 = { id: 1, firstName: "james", lastName: "last", type: 1 };
      expect(playerDefaultComparator(player1, player2)).toEqual(1);
    });
    test("id doesn't match", () => {
      const player1 = { id: 1, firstName: "first", lastName: "last", type: 1 };
      const player2 = { id: 2, firstName: "first", lastName: "last", type: 1 };
      expect(playerDefaultComparator(player1, player2)).toEqual(1);
    });
  });
});
describe("playerNameComparator", () => {
  describe("should return zero", () => {
    test("if last, first, and id match", () => {
      const player1 = { id: 1, firstName: "first", lastName: "last" };
      const player2 = { id: 1, firstName: "first", lastName: "last" };
      expect(playerNameComparator(player1, player2)).toEqual(0);
    });
    test("if neither player is set", () => expect(playerNameComparator()).toEqual(0));
  });
  describe("should return non-zero", () => {
    test("if the last names don't match", () => {
      const player1 = { id: 1, firstName: "john", lastName: "smith" };
      const player2 = { id: 1, firstName: "john", lastName: "anderson" };
      expect(playerNameComparator(player1, player2)).toEqual(-1);
    });
    test("if the first names don't match", () => {
      const player1 = { id: 1, firstName: "james", lastName: "smith" };
      const player2 = { id: 1, firstName: "john", lastName: "smith" };
      expect(playerNameComparator(player1, player2)).toEqual(1);
    });
    test("if the ids don't match", () => {
      const player1 = { id: 1, firstName: "john", lastName: "smith" };
      const player2 = { id: 2, firstName: "john", lastName: "smith" };
      expect(playerNameComparator(player1, player2)).toEqual(1);
    });
  });
});
describe("playerPositionsComparator", () => {
  describe("should return zero", () => {
    test("positions, name, and id match", () => {
      const player1 = { positions: [positions[2], positions[3], positions[4]] };
      const player2 = { positions: [positions[2], positions[3], positions[4]] };
      expect(playerPositionsComparator(player1, player2)).toEqual(0);
    });
    test("if neither player is set", () => expect(playerPositionsComparator()).toEqual(0));
    test("if neither position array is set", () => expect(playerPositionsComparator({}, {})).toEqual(0));
  });
  describe("should return non-zero", () => {
    test("if the positions match, but the IDs don't", () => {
      const player1 = { id: 1, positions: [positions[2], positions[3], positions[4]] };
      const player2 = { id: 2, positions: [positions[2], positions[3], positions[4]] };
      expect(playerPositionsComparator(player1, player2)).toEqual(1);
    });
    test("if the positions don't match", () => {
      const player1 = { id: 1, positions: [positions[2], positions[3], positions[4]] };
      const player2 = { id: 1, positions: [positions[3], positions[4]] };
      expect(playerPositionsComparator(player1, player2)).toEqual(1);
    });
    test("if the positions match but are of different lengths", () => {
      const player1 = { id: 1, positions: [positions[2], positions[3], positions[4]] };
      const player2 = { id: 1, positions: [positions[2], positions[3]] };
      expect(playerPositionsComparator(player1, player2)).toEqual(-1);
      expect(playerPositionsComparator(player2, player1)).toEqual(1);
    });
  });
});
describe("playerTeamComparator", () => {
  describe("should return zero", () => {
    test("team, name, and id match", () => {
      const player1 = { team: { code: "MIL" } };
      const player2 = { team: { code: "MIL" } };
      expect(playerTeamComparator(player1, player2)).toEqual(0);
    });
    test("if neither player is set", () => expect(playerTeamComparator()).toEqual(0));
    test("if neither team is set", () => expect(playerTeamComparator({}, {})).toEqual(0));
  });
  describe("should return non-zero", () => {
    test("if the teams match, but the IDs don't", () => {
      const player1 = { id: 1, team: { code: "MIL" } };
      const player2 = { id: 2, team: { code: "MIL" } };
      expect(playerTeamComparator(player1, player2)).toEqual(1);
    });
    test("if the teas don't match", () => {
      const player1 = { id: 1, team: { code: "MIL" } };
      const player2 = { id: 1, team: { code: "SF" } };
      expect(playerTeamComparator(player1, player2)).toEqual(1);
    });
  });
});

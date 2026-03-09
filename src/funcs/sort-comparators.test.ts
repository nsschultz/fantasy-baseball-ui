import { Player, Position, Team } from "../types/entity-types";
import { defaultObjectComparator, playerDefaultComparator, playerNameComparator, playerPositionsComparator, playerTeamComparator } from "./sort-comparators";

import { BaseEntity } from "../types/basic-types";

interface TestObject extends BaseEntity {
  matching: number;
  different: number;
  prop1?: number;
  prop2?: number;
}

const obj1: TestObject = { id: "123", matching: 1, different: 1, prop1: 1 };
const obj2: TestObject = { id: "abc", matching: 1, different: 2, prop2: 1 };
const positions: Position[] = [
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
const team1: Team = { code: "MIL", alternativeCode: null, leagueId: "NL", city: "Milwaukee", nickname: "Brewers" };
const team2: Team = { code: "SF", alternativeCode: null, leagueId: "NL", city: "San Francisco", nickname: "Giants" };

const playerBuilder = (id: string, firstName: string, lastName: string, type: number, positions?: Position[], team?: Team): Player => ({
  id: id,
  mlbAmId: 0,
  type: type,
  firstName: firstName,
  lastName: lastName,
  age: 0,
  status: 0,
  averageDraftPick: 0,
  averageDraftPickMin: 0,
  averageDraftPickMax: 0,
  reliability: 0,
  mayberryMethod: 0,
  league1: 0,
  league2: 0,
  battingStats: [],
  pitchingStats: [],
  team: team,
  positions: positions,
});

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
      const player1 = playerBuilder("1", "first", "last", 1);
      const player2 = playerBuilder("1", "first", "last", 1);
      expect(playerDefaultComparator(player1, player2)).toEqual(0);
    });
    test("if neither player is set", () => expect(playerDefaultComparator()).toEqual(0));
  });
  describe("should return non-zero", () => {
    test("type doesn't match", () => {
      const player1 = playerBuilder("1", "first", "last", 1);
      const player2 = playerBuilder("1", "first", "last", 2);
      expect(playerDefaultComparator(player1, player2)).toEqual(1);
    });
    test("last name doesn't match", () => {
      const player1 = playerBuilder("1", "first", "last", 1);
      const player2 = playerBuilder("1", "first", "smith", 1);
      expect(playerDefaultComparator(player1, player2)).toEqual(1);
    });
    test("first name doesn't match", () => {
      const player1 = playerBuilder("1", "first", "last", 1);
      const player2 = playerBuilder("1", "james", "last", 1);
      expect(playerDefaultComparator(player1, player2)).toEqual(1);
    });
    test("id doesn't match", () => {
      const player1 = playerBuilder("1", "first", "last", 1);
      const player2 = playerBuilder("2", "first", "last", 1);
      expect(playerDefaultComparator(player1, player2)).toEqual(1);
    });
  });
});
describe("playerNameComparator", () => {
  describe("should return zero", () => {
    test("if last, first, and id match", () => {
      const player1 = playerBuilder("1", "first", "last", 0);
      const player2 = playerBuilder("1", "first", "last", 0);
      expect(playerNameComparator(player1, player2)).toEqual(0);
    });
    test("if neither player is set", () => expect(playerNameComparator()).toEqual(0));
  });
  describe("should return non-zero", () => {
    test("if the last names don't match", () => {
      const player1 = playerBuilder("1", "john", "smith", 0);
      const player2 = playerBuilder("1", "john", "anderson", 0);
      expect(playerNameComparator(player1, player2)).toEqual(-1);
    });
    test("if the first names don't match", () => {
      const player1 = playerBuilder("1", "james", "smith", 0);
      const player2 = playerBuilder("1", "john", "smith", 0);
      expect(playerNameComparator(player1, player2)).toEqual(1);
    });
    test("if the ids don't match", () => {
      const player1 = playerBuilder("1", "john", "smith", 0);
      const player2 = playerBuilder("2", "john", "smith", 0);
      expect(playerNameComparator(player1, player2)).toEqual(1);
    });
  });
});
describe("playerPositionsComparator", () => {
  describe("should return zero", () => {
    test("positions, name, and id match", () => {
      const player1 = playerBuilder("1", "first", "last", 0, [positions[2], positions[3], positions[4]]);
      const player2 = playerBuilder("1", "first", "last", 0, [positions[2], positions[3], positions[4]]);
      expect(playerPositionsComparator(player1, player2)).toEqual(0);
    });
    test("if neither player is set", () => expect(playerPositionsComparator()).toEqual(0));
    test("if neither position array is set", () => {
      const player1 = playerBuilder("1", "first", "last", 0);
      const player2 = playerBuilder("1", "first", "last", 0);
      expect(playerPositionsComparator(player1, player2)).toEqual(0);
    });
  });
  describe("should return non-zero", () => {
    test("if the positions match, but the IDs don't", () => {
      const player1 = playerBuilder("1", "first", "last", 0, [positions[2], positions[3], positions[4]]);
      const player2 = playerBuilder("2", "first", "last", 0, [positions[2], positions[3], positions[4]]);
      expect(playerPositionsComparator(player1, player2)).toEqual(1);
    });
    test("if the positions don't match", () => {
      const player1 = playerBuilder("1", "first", "last", 0, [positions[2], positions[3], positions[4]]);
      const player2 = playerBuilder("1", "first", "last", 0, [positions[3], positions[4]]);
      expect(playerPositionsComparator(player1, player2)).toEqual(1);
    });
    test("if the positions match but are of different lengths", () => {
      const player1 = playerBuilder("1", "first", "last", 0, [positions[2], positions[3], positions[4]]);
      const player2 = playerBuilder("1", "first", "last", 0, [positions[2], positions[3]]);
      expect(playerPositionsComparator(player1, player2)).toEqual(-1);
      expect(playerPositionsComparator(player2, player1)).toEqual(1);
    });
  });
});
describe("playerTeamComparator", () => {
  describe("should return zero", () => {
    test("team, name, and id match", () => {
      const player1 = playerBuilder("1", "first", "last", 0, undefined, team1);
      const player2 = playerBuilder("1", "first", "last", 0, undefined, team1);
      expect(playerTeamComparator(player1, player2)).toEqual(0);
    });
    test("if neither player is set", () => expect(playerTeamComparator()).toEqual(0));
    test("if neither team is set", () => {
      const player1 = playerBuilder("1", "first", "last", 0);
      const player2 = playerBuilder("1", "first", "last", 0);
      expect(playerTeamComparator(player1, player2)).toEqual(0);
    });
  });
  describe("should return non-zero", () => {
    test("if the teams match, but the IDs don't", () => {
      const player1 = playerBuilder("1", "first", "last", 0, undefined, team1);
      const player2 = playerBuilder("2", "first", "last", 0, undefined, team1);
      expect(playerTeamComparator(player1, player2)).toEqual(1);
    });
    test("if the teams don't match", () => {
      const player1 = playerBuilder("1", "first", "last", 0, undefined, team1);
      const player2 = playerBuilder("1", "first", "last", 0, undefined, team2);
      expect(playerTeamComparator(player1, player2)).toEqual(1);
    });
  });
});

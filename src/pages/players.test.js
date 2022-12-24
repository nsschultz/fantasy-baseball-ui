import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";

import GlobalTheme from "../components/global-theme";
import Players from "./players";
import { ThemeProvider } from "@mui/material";
import axios from "axios";

class BattingStats {
  constructor(type) {
    this.statsType = type;
    this.atBats = 0;
    this.runs = 0;
    this.hits = 0;
    this.doubles = 0;
    this.triples = 0;
    this.homeRuns = 0;
    this.runsBattedIn = 0;
    this.baseOnBalls = 0;
    this.strikeOuts = 0;
    this.stolenBases = 0;
    this.caughtStealing = 0;
    this.totalBases = 0;
    this.battingAverage = 0;
    this.onBasePercentage = 0;
    this.sluggingPercentage = 0;
    this.onBasePlusSlugging = 0;
    this.contractRate = 0;
    this.power = 0;
    this.walkRate = 0;
    this.speed = 0;
    this.basePerformanceValue = 0;
  }
}
class PitchingStats {
  constructor(type) {
    this.statsType = type;
    this.wins = 0;
    this.losses = 0;
    this.qualityStarts = 0;
    this.saves = 0;
    this.blownSaves = 0;
    this.holds = 0;
    this.inningsPitched = 0;
    this.hitsAllowed = 0;
    this.earnedRuns = 0;
    this.homeRunsAllowed = 0;
    this.baseOnBallsAllowed = 0;
    this.strikeOuts = 0;
    this.flyBallRate = 0;
    this.groundBallRate = 0;
    this.earnedRunAverage = 0;
    this.walksAndHitsPerInningPitched = 0;
    this.battingAverageOnBallsInPlay = 0;
    this.strandRate = 0;
    this.command = 0;
    this.dominance = 0;
    this.control = 0;
    this.groundBallToFlyBallRate = 0;
    this.basePerformanceValue = 0;
  }
}
class Player {
  constructor(id, type, fName, lName, age, team, status, pos, l1, l2) {
    this.id = id;
    this.bhqId = 100 + parseInt(id, 10);
    this.type = type;
    this.firstName = fName;
    this.lastName = lName;
    this.age = age;
    this.team = team;
    this.status = status;
    this.positions = pos;
    this.draftRank = id;
    this.draftedPercentage = 1 - parseInt(id, 10) / 100;
    this.league1 = l1;
    this.league2 = l2;
    this.battingStats = [new BattingStats(1), new BattingStats(2), new BattingStats(3)];
    this.pitchingStats = [new PitchingStats(1), new PitchingStats(2), new PitchingStats(3)];
  }
}

let getSpy, putSpy;

const defaultRowDisplay = 10;
const players = [
  new Player(
    "01",
    1,
    "Fernando",
    "Tatis Jr.",
    22,
    { code: "SD", alternativeCode: null, leagueId: "NL", city: "San Diego", nickname: "Padres" },
    0,
    [
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
    ],
    0,
    0
  ),
  new Player(
    "02",
    1,
    "Ronald",
    "Acuna Jr.",
    23,
    { code: "ATL", alternativeCode: null, leagueId: "NL", city: "Atlanta", nickname: "Braves" },
    0,
    [
      {
        code: "OF",
        fullName: "Outfielder",
        playerType: 1,
        sortOrder: 11,
        additionalPositions: [{ code: "UTIL", fullName: "Utility", playerType: 1, sortOrder: 13, additionalPositions: [] }],
      },
    ],
    0,
    1
  ),
  new Player(
    "03",
    1,
    "Mookie",
    "Betts",
    28,
    { code: "LAD", alternativeCode: "LA", leagueId: "NL", city: "Los Angeles", nickname: "Dodgers" },
    0,
    [
      {
        code: "OF",
        fullName: "Outfielder",
        playerType: 1,
        sortOrder: 11,
        additionalPositions: [{ code: "UTIL", fullName: "Utility", playerType: 1, sortOrder: 13, additionalPositions: [] }],
      },
    ],
    0,
    2
  ),
  new Player(
    "04",
    1,
    "Juan",
    "Soto",
    22,
    { code: "WAS", alternativeCode: null, leagueId: "NL", city: "Washington", nickname: "Nationals" },
    3,
    [
      {
        code: "OF",
        fullName: "Outfielder",
        playerType: 1,
        sortOrder: 11,
        additionalPositions: [{ code: "UTIL", fullName: "Utility", playerType: 1, sortOrder: 13, additionalPositions: [] }],
      },
    ],
    0,
    3
  ),
  new Player(
    "05",
    1,
    "Trea",
    "Turner",
    28,
    { code: "LAD", alternativeCode: "LA", leagueId: "NL", city: "Los Angeles", nickname: "Dodgers" },
    0,
    [
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
    ],
    1,
    0
  ),
  new Player(
    "06",
    2,
    "Jacob",
    "deGrom",
    33,
    { code: "NYM", alternativeCode: null, leagueId: "NL", city: "New York", nickname: "Mets" },
    1,
    [
      {
        code: "SP",
        fullName: "Starting Pitcher",
        playerType: 2,
        sortOrder: 100,
        additionalPositions: [{ code: "P", fullName: "Pitcher", playerType: 2, sortOrder: 102, additionalPositions: [] }],
      },
    ],
    1,
    1
  ),
  new Player(
    "07",
    2,
    "Gerrit",
    "Cole",
    30,
    { code: "NYY", alternativeCode: null, leagueId: "AL", city: "New York", nickname: "Yankees" },
    0,
    [
      {
        code: "SP",
        fullName: "Starting Pitcher",
        playerType: 2,
        sortOrder: 100,
        additionalPositions: [{ code: "P", fullName: "Pitcher", playerType: 2, sortOrder: 102, additionalPositions: [] }],
      },
    ],
    1,
    2
  ),
  new Player(
    "08",
    1,
    "Mike",
    "Trout",
    29,
    { code: "LAA", alternativeCode: null, leagueId: "AL", city: "Los Angeles", nickname: "Angels" },
    2,
    [
      {
        code: "OF",
        fullName: "Outfielder",
        playerType: 1,
        sortOrder: 11,
        additionalPositions: [{ code: "UTIL", fullName: "Utility", playerType: 1, sortOrder: 13, additionalPositions: [] }],
      },
    ],
    1,
    3
  ),
  new Player(
    "09",
    1,
    "Christian",
    "Yelich",
    29,
    { code: "MIL", alternativeCode: null, leagueId: "NL", city: "Milwaukee", nickname: "Brewers" },
    0,
    [
      {
        code: "OF",
        fullName: "Outfielder",
        playerType: 1,
        sortOrder: 11,
        additionalPositions: [{ code: "UTIL", fullName: "Utility", playerType: 1, sortOrder: 13, additionalPositions: [] }],
      },
    ],
    9,
    0.11,
    2,
    0
  ),
  new Player(
    "10",
    1,
    "Trevor",
    "Story",
    28,
    { code: "COL", alternativeCode: null, leagueId: "NL", city: "Colorado", nickname: "Rockies" },
    0,
    [
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
    ],
    2,
    1
  ),
  new Player(
    "11",
    1,
    "Jose",
    "Ramirez",
    28,
    { code: "CLE", alternativeCode: null, leagueId: "AL", city: "Cleveland", nickname: "Guardians" },
    0,
    [
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
    ],
    2,
    2
  ),
];
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
const teams = [
  { code: "", alternativeCode: null, leagueId: "", city: "Free Agent", nickname: "Free Agent" },
  { code: "ARZ", alternativeCode: "ARI", leagueId: "NL", city: "Arizona", nickname: "Diamondbacks" },
  { code: "ATL", alternativeCode: null, leagueId: "NL", city: "Atlanta", nickname: "Braves" },
  { code: "BAL", alternativeCode: null, leagueId: "AL", city: "Baltimore", nickname: "Orioles" },
  { code: "BOS", alternativeCode: null, leagueId: "AL", city: "Boston", nickname: "Red Sox" },
  { code: "CHC", alternativeCode: null, leagueId: "NL", city: "Chicago", nickname: "Cubs" },
  { code: "CIN", alternativeCode: null, leagueId: "NL", city: "Cincinnati", nickname: "Reds" },
  { code: "CLE", alternativeCode: null, leagueId: "AL", city: "Cleveland", nickname: "Guardians" },
  { code: "COL", alternativeCode: null, leagueId: "NL", city: "Colorado", nickname: "Rockies" },
  { code: "CWS", alternativeCode: "CHW", leagueId: "AL", city: "Chicago", nickname: "White Sox" },
  { code: "DET", alternativeCode: null, leagueId: "AL", city: "Detriot", nickname: "Tigers" },
  { code: "HOU", alternativeCode: null, leagueId: "AL", city: "Houston", nickname: "Astros" },
  { code: "KC", alternativeCode: null, leagueId: "AL", city: "Kansas City", nickname: "Royals" },
  { code: "LAA", alternativeCode: null, leagueId: "AL", city: "Los Angeles", nickname: "Angels" },
  { code: "LAD", alternativeCode: "LA", leagueId: "NL", city: "Los Angeles", nickname: "Dodgers" },
  { code: "MIA", alternativeCode: null, leagueId: "NL", city: "Miami", nickname: "Marlins" },
  { code: "MIL", alternativeCode: null, leagueId: "NL", city: "Milwaukee", nickname: "Brewers" },
  { code: "MIN", alternativeCode: null, leagueId: "AL", city: "Minnesota", nickname: "Twins" },
  { code: "NYM", alternativeCode: null, leagueId: "NL", city: "New York", nickname: "Mets" },
  { code: "NYY", alternativeCode: null, leagueId: "AL", city: "New York", nickname: "Yankees" },
  { code: "OAK", alternativeCode: null, leagueId: "AL", city: "Oakland", nickname: "Athletics" },
  { code: "PHI", alternativeCode: null, leagueId: "NL", city: "Philadelphia", nickname: "Phillies" },
  { code: "PIT", alternativeCode: null, leagueId: "NL", city: "Pittsburgh", nickname: "Pirates" },
  { code: "SD", alternativeCode: null, leagueId: "NL", city: "San Diego", nickname: "Padres" },
  { code: "SEA", alternativeCode: null, leagueId: "AL", city: "Seattle", nickname: "Mariners" },
  { code: "SF", alternativeCode: null, leagueId: "NL", city: "San Francisco", nickname: "Giants" },
  { code: "STL", alternativeCode: null, leagueId: "NL", city: "St. Louis", nickname: "Cardinals" },
  { code: "TB", alternativeCode: "TAM", leagueId: "AL", city: "Tampa Bay", nickname: "Rays" },
  { code: "TEX", alternativeCode: null, leagueId: "AL", city: "Texas", nickname: "Rangers" },
  { code: "TOR", alternativeCode: null, leagueId: "AL", city: "Toronto", nickname: "Blue Jays" },
  { code: "WAS", alternativeCode: null, leagueId: "NL", city: "Washington", nickname: "Nationals" },
];

jest.mock("axios");
afterEach(() => jest.clearAllMocks());
beforeEach(() => (getSpy = jest.spyOn(axios, "get")));
beforeEach(() => {
  axios.get.mockImplementationOnce(() => Promise.resolve({ data: { 0: "Available", 1: "Rostered", 2: "Unavailable", 3: "Scouted" } }));
  axios.get.mockImplementationOnce(() => Promise.resolve({ data: { 0: "", 1: "Disabled List", 2: "Not Available", 3: "New Entry" } }));
  axios.get.mockImplementationOnce(() => Promise.resolve({ data: { 0: "Unknown", 1: "Batter", 2: "Pitcher" } }));
  axios.get.mockImplementationOnce(() => Promise.resolve({ data: positions }));
  axios.get.mockImplementationOnce(() => Promise.resolve({ data: { 0: "Unknown", 1: "Year to Date", 2: "Projected", 3: "Combined" } }));
  axios.get.mockImplementationOnce(() => Promise.resolve({ data: teams }));
});
beforeEach(() => (putSpy = jest.spyOn(axios, "put")));

const TestWrapper = () => (
  <ThemeProvider theme={GlobalTheme()}>
    <Players />
  </ThemeProvider>
);

describe("Player", () => {
  describe("should render", () => {
    test("the table with data", async () => {
      axios.get.mockImplementationOnce(() => Promise.resolve({ data: players }));
      render(<TestWrapper />);
      expect(getSpy).toHaveBeenCalledTimes(7);
      expect(screen.getByText("Loading Players...")).toBeVisible();
      await act(async () => await new Promise((resolve) => setTimeout(resolve, 120)));
      expect(screen.getAllByRole("row")).toHaveLength(defaultRowDisplay * 2 + 1);
      fireEvent.click(screen.getByTestId("row-expand-01"));
      expect(screen.getAllByRole("row")).toHaveLength(defaultRowDisplay * 2 + 1 + 4);
      fireEvent.click(screen.getByTestId("row-expand-06"));
      expect(screen.getAllByRole("row")).toHaveLength(defaultRowDisplay * 2 + 1 + 4 + 4);
    });
    test("when there is data error", async () => {
      axios.get.mockImplementationOnce(() => Promise.reject(new Error("errorMessage")));
      render(<TestWrapper />);
      expect(getSpy).toHaveBeenCalledTimes(7);
      expect(screen.getByText("Loading Players...")).toBeVisible();
      await act(async () => await new Promise((resolve) => setTimeout(resolve, 120)));
      expect(screen.queryByText("Loading Players...")).toBeFalsy();
    });
  });
  describe("should handle a", () => {
    test("successful update", async () => {
      axios.get.mockImplementationOnce(() => Promise.resolve({ data: players }));
      axios.put.mockImplementationOnce(() => Promise.resolve({}));
      render(<TestWrapper />);
      expect(getSpy).toHaveBeenCalledTimes(7);
      expect(screen.getByText("Loading Players...")).toBeVisible();
      await act(async () => await new Promise((resolve) => setTimeout(resolve, 120)));
      expect(screen.getAllByRole("row")).toHaveLength(defaultRowDisplay * 2 + 1);
      fireEvent.click(screen.getByTestId("row-edit-01"));
      fireEvent.click(screen.getByRole("button", { name: "Save" }));
      await waitFor(() => expect(putSpy).toBeCalled());
      expect(screen.getAllByRole("row")).toHaveLength(defaultRowDisplay * 2 + 1);
    }, 30000);
    xtest("failed update", async () => {
      axios.get.mockImplementationOnce(() => Promise.resolve({ data: players }));
      axios.put.mockImplementationOnce(() => Promise.reject(new Error("errorMessage")));
      render(<TestWrapper />);
      expect(getSpy).toHaveBeenCalledTimes(7);
      expect(screen.getByText("Loading Players...")).toBeVisible();
      await act(async () => await new Promise((resolve) => setTimeout(resolve, 120)));
      expect(screen.getAllByRole("row")).toHaveLength(defaultRowDisplay * 2 + 1);
      fireEvent.click(screen.getByTestId("row-edit-01"));
      fireEvent.click(screen.getByRole("button", { name: "Save" }));
      await waitFor(() => expect(putSpy).toBeCalled());
      expect(screen.getAllByRole("row")).toHaveLength(defaultRowDisplay * 2 + 1);
    });
  });
});

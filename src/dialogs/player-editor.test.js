import { cleanup, fireEvent, render, screen } from "@testing-library/react";

import GlobalTheme from "../global-theme";
import PlayerEditor from "./player-editor";
import { ThemeProvider } from "@mui/material";
import { buildTeamDisplay } from "../funcs/team-helper";

let count, hasExisting, hasNew;
const existingPositions = [
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
];
const existingTeam = { code: "MIL", alternativeCode: null, leagueId: "NL", city: "Milwaukee", nickname: "Brewers" };
const existingPlayer = {
  mlbAmId: 9999,
  id: 1,
  age: 40,
  averageDraftPick: 3.36,
  averageDraftPickMin: 1,
  averageDraftPickMax: 5,
  firstName: "Nick",
  lastName: "Schultz",
  name: "Nick Schultz",
  league1: 2,
  league2: 3,
  positions: existingPositions,
  status: 0,
  team: existingTeam,
  type: 1,
};
const lookups = {
  leagusStatuses: { 0: "Available", 1: "Rostered", 2: "Unavailable", 3: "Scouted" },
  playerStatuses: { 0: "Normal", 1: "Disabled List", 2: "Not Available", 3: "New Entry" },
  playerTypes: { 0: "Unknown", 1: "Batter", 2: "Pitcher" },
  positions: [
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
  ],
  teams: [
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
  ],
};
const newPositionAdd = [
  {
    code: "SP",
    fullName: "Starting Pitcher",
    playerType: 2,
    sortOrder: 100,
    additionalPositions: [{ code: "P", fullName: "Pitcher", playerType: 2, sortOrder: 102, additionalPositions: [] }],
  },
];
const newPositionEdit = [
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
    code: "OF",
    fullName: "Outfielder",
    playerType: 1,
    sortOrder: 11,
    additionalPositions: [{ code: "UTIL", fullName: "Utility", playerType: 1, sortOrder: 13, additionalPositions: [] }],
  },
];
const newTeam = { code: "SF", alternativeCode: null, leagueId: "NL", city: "San Francisco", nickname: "Giants" };

const mutateDropDown = (label, currentValueString, newValue) => {
  fireEvent.mouseDown(screen.getByRole("button", { name: `${label} ${currentValueString}` }));
  fireEvent.click(screen.getByRole("option", { name: newValue }));
};
const mutatePlayer = (player) => {
  fireEvent.change(screen.getByLabelText("First Name"), { target: { value: "Annie" } });
  fireEvent.change(screen.getByLabelText("Last Name"), { target: { value: "Oppman" } });
  fireEvent.change(screen.getByLabelText("Age"), { target: { value: 35 } });
  mutateDropDown("Team", buildTeamDisplay(player.team) || "​", "San Francisco Giants");
  mutatePlayerStatus("Status", player.status, "Disabled List", lookups.playerStatuses);
  mutatePlayerStatus("League #1 Status", player.league1, "Rostered", lookups.leagusStatuses);
  mutatePlayerStatus("League #2 Status", player.league2, "Unavailable", lookups.leagusStatuses);
  fireEvent.change(screen.getByLabelText("ADP"), { target: { value: 7.51 } });
  fireEvent.change(screen.getByLabelText("ADP Min"), { target: { value: 3 } });
  fireEvent.change(screen.getByLabelText("ADP Max"), { target: { value: 17 } });
  if (player.id) {
    expect(screen.getByLabelText("Type")).toHaveAttribute("aria-disabled");
    expect(screen.getByLabelText("MLBAMID")).toBeDisabled();
    mutateDropDown("Position(s)", "2B,SS", "Outfielder");
  } else {
    mutatePlayerStatus("Type", player.type, "Pitcher", lookups.playerTypes);
    fireEvent.change(screen.getByLabelText("MLBAMID"), { target: { value: 1234 } });
    mutateDropDown("Position(s)", "​", "Starting Pitcher");
  }
};
const mutatePlayerStatus = (label, currentValue, newValue, enums) => mutateDropDown(label, enums[currentValue ?? 0], newValue);
const onCloseDefault = (newPlayer) => {
  count++;
  if (hasExisting) verifyPlayer(existingPlayer, 40, 9999, 3.36, 1, 5, "Nick", "Schultz", 2, 3, existingPositions, 0, existingTeam, 1);
  if (hasNew)
    if (hasExisting) verifyPlayer(newPlayer, 35, 9999, 7.51, 3, 17, "Annie", "Oppman", 1, 2, newPositionEdit, 1, newTeam, 1);
    else verifyPlayer(newPlayer, 35, 1234, 7.51, 3, 17, "Annie", "Oppman", 1, 2, newPositionAdd, 1, newTeam, 2);
  else expect(newPlayer).toEqual(undefined);
};
const verifyPlayer = (
  player,
  age,
  mlbAmId,
  averageDraftPick,
  averageDraftPickMin,
  averageDraftPickMax,
  firstName,
  lastName,
  league1,
  league2,
  positions,
  status,
  team,
  type
) => {
  expect(player.age).toEqual(age);
  expect(player.mlbAmId).toEqual(mlbAmId);
  expect(player.averageDraftPick).toEqual(averageDraftPick);
  expect(player.averageDraftPickMin).toEqual(averageDraftPickMin);
  expect(player.averageDraftPickMax).toEqual(averageDraftPickMax);
  expect(player.firstName).toEqual(firstName);
  expect(player.lastName).toEqual(lastName);
  expect(player.name).toEqual(`${firstName} ${lastName}`);
  expect(player.league1).toEqual(league1);
  expect(player.league2).toEqual(league2);
  expect(player.positions).toEqual(positions);
  expect(player.status).toEqual(status);
  expect(player.team).toEqual(team);
  expect(player.type).toEqual(type);
};

afterEach(cleanup);
beforeEach(() => (count = 0));
beforeEach(() => (hasExisting = true));
beforeEach(() => (hasNew = true));

const TestWrapper = ({ onClose }) => (
  <ThemeProvider theme={GlobalTheme()}>
    <PlayerEditor lookups={lookups} player={hasExisting ? existingPlayer : undefined} open={true} onClose={onClose} />
  </ThemeProvider>
);

describe("PlayerEditor", () => {
  describe("should handle a", () => {
    test("cancel", () => {
      hasNew = false;
      render(<TestWrapper onClose={onCloseDefault} />);
      mutatePlayer(existingPlayer);
      fireEvent.click(screen.getByText("Cancel"));
      expect(count).toEqual(1);
    });
    test("save", () => {
      render(<TestWrapper onClose={onCloseDefault} />);
      mutatePlayer(existingPlayer);
      fireEvent.click(screen.getByText("Save"));
      expect(count).toEqual(1);
    });
    test("save without player set", () => {
      hasExisting = false;
      render(<TestWrapper onClose={onCloseDefault} />);
      mutatePlayer({});
      fireEvent.click(screen.getByText("Save"));
      expect(count).toEqual(1);
    });
  });
  describe("should not accept values", () => {
    test("below the min", () => {
      const onClose = (newPlayer) => {
        count++;
        expect(newPlayer.age).toEqual(0);
        expect(newPlayer.mlbAmId).toEqual(0);
        expect(newPlayer.averageDraftPick).toEqual(1);
      };
      render(<TestWrapper onClose={onClose} />);
      fireEvent.change(screen.getByLabelText("Age"), { target: { value: -35 } });
      fireEvent.change(screen.getByLabelText("MLBAMID"), { target: { value: -1234 } });
      fireEvent.change(screen.getByLabelText("ADP"), { target: { value: -0.07 } });
      fireEvent.change(screen.getByLabelText("ADP Min"), { target: { value: -1 } });
      fireEvent.change(screen.getByLabelText("ADP Max"), { target: { value: -2 } });
      fireEvent.click(screen.getByText("Save"));
      expect(count).toEqual(1);
    });
    test("above the max", () => {
      const onClose = (newPlayer) => {
        count++;
        expect(newPlayer.averageDraftPick).toEqual(9999);
      };
      render(<TestWrapper onClose={onClose} />);
      fireEvent.change(screen.getByLabelText("ADP"), { target: { value: 1234567890 } });
      fireEvent.change(screen.getByLabelText("ADP Min"), { target: { value: 1234567890 } });
      fireEvent.change(screen.getByLabelText("ADP Max"), { target: { value: 1234567890 } });
      fireEvent.click(screen.getByText("Save"));
      expect(count).toEqual(1);
    });
  });
});

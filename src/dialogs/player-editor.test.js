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
  age: 40,
  draftedPercentage: 0.36,
  draftRank: 10,
  firstName: "Nick",
  lastName: "Schultz",
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
const newPosition = [
  {
    code: "SP",
    fullName: "Starting Pitcher",
    playerType: 2,
    sortOrder: 100,
    additionalPositions: [{ code: "P", fullName: "Pitcher", playerType: 2, sortOrder: 102, additionalPositions: [] }],
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
  mutatePlayerStatus("Type", player.type, "Pitcher", lookups.playerTypes);
  mutateDropDown("Team", buildTeamDisplay(player.team) || "​", "San Francisco Giants");
  mutatePlayerStatus("Status", player.status, "Disabled List", lookups.playerStatuses);
  mutatePlayerStatus("League #1 Status", player.league1, "Rostered", lookups.leagusStatuses);
  mutatePlayerStatus("League #2 Status", player.league2, "Unavailable", lookups.leagusStatuses);
  fireEvent.change(screen.getByLabelText("Draft Rank"), { target: { value: 20 } });
  fireEvent.change(screen.getByLabelText("Drafted %"), { target: { value: 0.07 } });
  mutateDropDown("Position(s)", "​", "Starting Pitcher");
};
const mutatePlayerStatus = (label, currentValue, newValue, enums) => mutateDropDown(label, enums[currentValue ?? 0], newValue);
const onCloseDefault = (newPlayer) => {
  count++;
  if (hasExisting) verifyPlayer(existingPlayer, 40, 0.36, 10, "Nick", "Schultz", 2, 3, existingPositions, 0, existingTeam, 1);
  if (hasNew) verifyPlayer(newPlayer, "35", "0.07", "20", "Annie", "Oppman", 1, 2, newPosition, 1, newTeam, 2);
  else expect(newPlayer).toEqual(undefined);
};
const verifyPlayer = (player, age, draftedPercentage, draftRank, firstName, lastName, league1, league2, positions, status, team, type) => {
  expect(player.age).toEqual(age);
  expect(player.draftedPercentage).toEqual(draftedPercentage);
  expect(player.draftRank).toEqual(draftRank);
  expect(player.firstName).toEqual(firstName);
  expect(player.lastName).toEqual(lastName);
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
        expect(newPlayer.draftedPercentage).toEqual(0);
        expect(newPlayer.draftRank).toEqual(1);
      };
      render(<TestWrapper onClose={onClose} />);
      fireEvent.change(screen.getByLabelText("Age"), { target: { value: -35 } });
      fireEvent.change(screen.getByLabelText("Draft Rank"), { target: { value: -20 } });
      fireEvent.change(screen.getByLabelText("Drafted %"), { target: { value: -0.07 } });
      fireEvent.click(screen.getByText("Save"));
      expect(count).toEqual(1);
    });
    test("above the max", () => {
      const onClose = (newPlayer) => {
        count++;
        expect(newPlayer.draftedPercentage).toEqual(1);
        expect(newPlayer.draftRank).toEqual(9999);
      };
      render(<TestWrapper onClose={onClose} />);
      fireEvent.change(screen.getByLabelText("Draft Rank"), { target: { value: 1234567890 } });
      fireEvent.change(screen.getByLabelText("Drafted %"), { target: { value: 1234567890 } });
      fireEvent.click(screen.getByText("Save"));
      expect(count).toEqual(1);
    });
  });
});

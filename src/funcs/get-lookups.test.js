import { getLeagueStatusEnums, getPlayerStatusEnums, getPlayerTypeEnums, getPositions, getStatsTypeEnums, getTeams } from "./get-lookups";

import axios from "axios";

let getSpy;
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

const validateError = (func) => {
  axios.get.mockImplementationOnce(() => Promise.reject(new Error("errorMessage")));
  func((response) => expect(response).toEqual([]));
};
const validateMissing = (func, url, data) => {
  axios.get.mockImplementationOnce(() => Promise.resolve({ data: data }));
  func();
  expect(getSpy).not.toHaveBeenCalledWith(url);
};
const validateValid = (func, url, data) => {
  axios.get.mockImplementationOnce(() => Promise.resolve({ data: data }));
  func((response) => expect(response).toEqual(data));
  expect(getSpy).toHaveBeenCalledWith(url);
};

jest.mock("axios");
afterEach(() => jest.clearAllMocks());
beforeEach(() => (getSpy = jest.spyOn(axios, "get")));

describe("getLeagueStatusEnums", () => {
  const data = { 0: "Available", 1: "Rostered", 2: "Unavailable", 3: "Scouted" };
  const func = getLeagueStatusEnums;
  const url = "player.api.url/api/v3/enum-map?enumType=LeagueStatus";
  test("should get values", () => validateValid(func, url, data));
  test("should handle missing handler", () => validateMissing(func, url, data));
  test("should handle errors", () => validateError(func));
});
describe("getPlayerStatusEnums", () => {
  const data = { 0: "", 1: "Disabled List", 2: "Not Available", 3: "New Entry" };
  const func = getPlayerStatusEnums;
  const url = "player.api.url/api/v3/enum-map?enumType=PlayerStatus";
  test("should get values", () => validateValid(func, url, data));
  test("should handle missing handler", () => validateMissing(func, url, data));
  test("should handle errors", () => validateError(func));
});
describe("getPlayerTypeEnums", () => {
  const data = { 0: "Unknown", 1: "Batter", 2: "Pitcher" };
  const func = getPlayerTypeEnums;
  const url = "player.api.url/api/v3/enum-map?enumType=PlayerType";
  test("should get values", () => validateValid(func, url, data));
  test("should handle missing handler", () => validateMissing(func, url, data));
  test("should handle errors", () => validateError(func));
});
describe("getPositions", () => {
  const func = getPositions;
  const url = "position.api.url/api/v1/position";
  test("should get values", () => validateValid(func, url, positions));
  test("should handle missing handler", () => validateMissing(func, url, positions));
  test("should handle errors", () => validateError(func));
});
describe("getStatsTypeEnums", () => {
  const data = { 0: "Unknown", 1: "Year to Date", 2: "Projected", 3: "Combined" };
  const func = getStatsTypeEnums;
  const url = "player.api.url/api/v3/enum-map?enumType=StatsType";
  test("should get values", () => validateValid(func, url, data));
  test("should handle missing handler", () => validateMissing(func, url, data));
  test("should handle errors", () => validateError(func));
});
describe("getTeams", () => {
  const func = getTeams;
  const url = "player.api.url/api/v3/team";
  test("should get values", () => validateValid(func, url, teams));
  test("should handle missing handler", () => validateMissing(func, url, teams));
  test("should handle errors", () => validateError(func));
});

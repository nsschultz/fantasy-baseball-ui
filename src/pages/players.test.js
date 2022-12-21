import { act, fireEvent, render, screen } from "@testing-library/react";

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
  new Player("01", 1, "Fernando", "Tatis Jr.", 22, "SD", 0, "SS", 0, 0),
  new Player("02", 1, "Ronald", "Acuna Jr.", 23, "ATL", 0, "OF", 0, 1),
  new Player("03", 1, "Mookie", "Betts", 28, "LAD", 0, "OF", 0, 2),
  new Player("04", 1, "Juan", "Soto", 22, "WAS", 3, "OF", 0, 3),
  new Player("05", 1, "Trea", "Turner", 28, "LAD", 0, "SS", 1, 0),
  new Player("06", 2, "Jacob", "deGrom", 33, "NYM", 1, "SP", 1, 1),
  new Player("07", 2, "Gerrit", "Cole", 30, "NYY", 0, "SP", 1, 2),
  new Player("08", 1, "Mike", "Trout", 29, "LAA", 2, "OF", 1, 3),
  new Player("09", 1, "Christian", "Yelich", 29, "MIL", 0, "OF", 9, 0.11, 2, 0),
  new Player("10", 1, "Trevor", "Story", 28, "COL", 0, "SS", 2, 1),
  new Player("11", 1, "Jose", "Ramirez", 28, "CLE", 0, "3B", 2, 2),
];

jest.mock("axios");

afterEach(() => jest.clearAllMocks());
beforeEach(() => (getSpy = jest.spyOn(axios, "get")));
beforeEach(() => {
  axios.get.mockImplementationOnce(() => Promise.resolve({ data: { 0: "Available", 1: "Rostered", 2: "Unavailable", 3: "Scouted" } }));
  axios.get.mockImplementationOnce(() => Promise.resolve({ data: { 0: "", 1: "Disabled List", 2: "Not Available", 3: "New Entry" } }));
  axios.get.mockImplementationOnce(() => Promise.resolve({ data: { 0: "Unknown", 1: "Batter", 2: "Pitcher" } }));
  axios.get.mockImplementationOnce(() => Promise.resolve({ data: { 0: "Unknown", 1: "Year to Date", 2: "Projected", 3: "Combined" } }));
});
beforeEach(() => (putSpy = jest.spyOn(axios, "put")));

test("should render the table with data", async () => {
  axios.get.mockImplementationOnce(() => Promise.resolve({ data: players }));
  render(
    <ThemeProvider theme={GlobalTheme()}>
      <Players />
    </ThemeProvider>
  );
  expect(getSpy).toHaveBeenCalledTimes(5);
  expect(screen.getByText("Loading Players...")).toBeVisible();
  await act(async () => await new Promise((resolve) => setTimeout(resolve, 120)));
  expect(screen.getAllByRole("row")).toHaveLength(defaultRowDisplay * 2 + 1);
  fireEvent.click(screen.getByTestId("row-expand-01"));
  expect(screen.getAllByRole("row")).toHaveLength(defaultRowDisplay * 2 + 1 + 4);
  fireEvent.click(screen.getByTestId("row-expand-06"));
  expect(screen.getAllByRole("row")).toHaveLength(defaultRowDisplay * 2 + 1 + 4 + 4);
});

test("should render when there is data error", async () => {
  axios.get.mockImplementationOnce(() => Promise.reject(new Error("errorMessage")));
  render(
    <ThemeProvider theme={GlobalTheme()}>
      <Players />
    </ThemeProvider>
  );
  expect(getSpy).toHaveBeenCalledTimes(5);
  expect(screen.getByText("Loading Players...")).toBeVisible();
  await act(async () => await new Promise((resolve) => setTimeout(resolve, 120)));
  expect(screen.queryByText("Loading Players...")).toBeFalsy();
});

test("should handle a successful update", async () => {
  axios.get.mockImplementationOnce(() => Promise.resolve({ data: players }));
  axios.put.mockImplementationOnce(() => Promise.resolve({}));
  render(
    <ThemeProvider theme={GlobalTheme()}>
      <Players />
    </ThemeProvider>
  );
  expect(getSpy).toHaveBeenCalledTimes(5);
  expect(screen.getByText("Loading Players...")).toBeVisible();
  await act(async () => await new Promise((resolve) => setTimeout(resolve, 120)));
  expect(screen.getAllByRole("row")).toHaveLength(defaultRowDisplay * 2 + 1);
  fireEvent.click(screen.getByTestId("row-edit-01"));
  fireEvent.click(screen.getByRole("button", { name: "Save" }));
  expect(putSpy).toBeCalled();
  expect(screen.getAllByRole("row")).toHaveLength(defaultRowDisplay * 2 + 1);
});

test("should handle a failed update", async () => {
  axios.get.mockImplementationOnce(() => Promise.resolve({ data: players }));
  axios.put.mockImplementationOnce(() => Promise.reject(new Error("errorMessage")));
  render(
    <ThemeProvider theme={GlobalTheme()}>
      <Players />
    </ThemeProvider>
  );
  expect(getSpy).toHaveBeenCalledTimes(5);
  expect(screen.getByText("Loading Players...")).toBeVisible();
  await act(async () => await new Promise((resolve) => setTimeout(resolve, 120)));
  expect(screen.getAllByRole("row")).toHaveLength(defaultRowDisplay * 2 + 1);
  fireEvent.click(screen.getByTestId("row-edit-01"));
  fireEvent.click(screen.getByRole("button", { name: "Save" }));
  expect(putSpy).toBeCalled();
  expect(screen.getAllByRole("row")).toHaveLength(defaultRowDisplay * 2 + 1);
});

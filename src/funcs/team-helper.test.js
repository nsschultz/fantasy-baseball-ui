import { buildTeamDisplay, buildTeamMap } from "./team-helper";

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

describe("buildTeamDisplay", () => {
  test("should build a team display", () => expect(buildTeamDisplay(teams[16])).toEqual("Milwaukee Brewers"));
  test("should return empty string on null obj", () => expect(buildTeamDisplay()).toEqual(""));
  test("should return empty string on empty obj", () => expect(buildTeamDisplay({})).toEqual(""));
  test("should return just city if nickname is missing", () => expect(buildTeamDisplay({ city: "Jackson" })).toEqual("Jackson"));
  test("should return just nickname if city is missing", () => expect(buildTeamDisplay({ nickname: "Jaguars" })).toEqual("Jaguars"));
});
describe("buildTeamMap", () => {
  test("should build a team map", () =>
    expect(buildTeamMap(teams)).toEqual({
      "": { code: "", alternativeCode: null, leagueId: "", city: "Free Agent", nickname: "Free Agent" },
      ARZ: { code: "ARZ", alternativeCode: "ARI", leagueId: "NL", city: "Arizona", nickname: "Diamondbacks" },
      ATL: { code: "ATL", alternativeCode: null, leagueId: "NL", city: "Atlanta", nickname: "Braves" },
      BAL: { code: "BAL", alternativeCode: null, leagueId: "AL", city: "Baltimore", nickname: "Orioles" },
      BOS: { code: "BOS", alternativeCode: null, leagueId: "AL", city: "Boston", nickname: "Red Sox" },
      CHC: { code: "CHC", alternativeCode: null, leagueId: "NL", city: "Chicago", nickname: "Cubs" },
      CIN: { code: "CIN", alternativeCode: null, leagueId: "NL", city: "Cincinnati", nickname: "Reds" },
      CLE: { code: "CLE", alternativeCode: null, leagueId: "AL", city: "Cleveland", nickname: "Guardians" },
      COL: { code: "COL", alternativeCode: null, leagueId: "NL", city: "Colorado", nickname: "Rockies" },
      CWS: { code: "CWS", alternativeCode: "CHW", leagueId: "AL", city: "Chicago", nickname: "White Sox" },
      DET: { code: "DET", alternativeCode: null, leagueId: "AL", city: "Detriot", nickname: "Tigers" },
      HOU: { code: "HOU", alternativeCode: null, leagueId: "AL", city: "Houston", nickname: "Astros" },
      KC: { code: "KC", alternativeCode: null, leagueId: "AL", city: "Kansas City", nickname: "Royals" },
      LAA: { code: "LAA", alternativeCode: null, leagueId: "AL", city: "Los Angeles", nickname: "Angels" },
      LAD: { code: "LAD", alternativeCode: "LA", leagueId: "NL", city: "Los Angeles", nickname: "Dodgers" },
      MIA: { code: "MIA", alternativeCode: null, leagueId: "NL", city: "Miami", nickname: "Marlins" },
      MIL: { code: "MIL", alternativeCode: null, leagueId: "NL", city: "Milwaukee", nickname: "Brewers" },
      MIN: { code: "MIN", alternativeCode: null, leagueId: "AL", city: "Minnesota", nickname: "Twins" },
      NYM: { code: "NYM", alternativeCode: null, leagueId: "NL", city: "New York", nickname: "Mets" },
      NYY: { code: "NYY", alternativeCode: null, leagueId: "AL", city: "New York", nickname: "Yankees" },
      OAK: { code: "OAK", alternativeCode: null, leagueId: "AL", city: "Oakland", nickname: "Athletics" },
      PHI: { code: "PHI", alternativeCode: null, leagueId: "NL", city: "Philadelphia", nickname: "Phillies" },
      PIT: { code: "PIT", alternativeCode: null, leagueId: "NL", city: "Pittsburgh", nickname: "Pirates" },
      SD: { code: "SD", alternativeCode: null, leagueId: "NL", city: "San Diego", nickname: "Padres" },
      SEA: { code: "SEA", alternativeCode: null, leagueId: "AL", city: "Seattle", nickname: "Mariners" },
      SF: { code: "SF", alternativeCode: null, leagueId: "NL", city: "San Francisco", nickname: "Giants" },
      STL: { code: "STL", alternativeCode: null, leagueId: "NL", city: "St. Louis", nickname: "Cardinals" },
      TB: { code: "TB", alternativeCode: "TAM", leagueId: "AL", city: "Tampa Bay", nickname: "Rays" },
      TEX: { code: "TEX", alternativeCode: null, leagueId: "AL", city: "Texas", nickname: "Rangers" },
      TOR: { code: "TOR", alternativeCode: null, leagueId: "AL", city: "Toronto", nickname: "Blue Jays" },
      WAS: { code: "WAS", alternativeCode: null, leagueId: "NL", city: "Washington", nickname: "Nationals" },
    }));
});

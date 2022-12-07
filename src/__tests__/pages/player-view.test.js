import { fireEvent, render, screen } from "@testing-library/react";

import GlobalTheme from "../../components/global-theme";
import PlayerView from "../../pages/player-view";
import { ThemeProvider } from "@mui/material";

const existingPlayer = {
  age: 40,
  draftedPercentage: 0.36,
  draftRank: 10,
  firstName: "Nick",
  lastName: "Schultz",
  league1: 2,
  league2: 3,
  positions: "2B-SS",
  status: 0,
  team: "MIL",
  type: 1,
};

const enums = {
  leagusStatuses: { 0: "Available", 1: "Rostered", 2: "Unavailable", 3: "Scouted" },
  playerStatuses: { 0: "Normal", 1: "Disabled List", 2: "Not Available", 3: "New Entry" },
  playerTypes: { 0: "Unknown", 1: "Batter", 2: "Pitcher" },
};

const mutatePlayer = (player) => {
  fireEvent.change(screen.getByLabelText("First Name"), { target: { value: "Annie" } });
  fireEvent.change(screen.getByLabelText("Last Name"), { target: { value: "Oppman" } });
  fireEvent.change(screen.getByLabelText("Age"), { target: { value: 35 } });
  mutatePlayerStatus("Type", player.type, "Pitcher", enums.playerTypes);
  fireEvent.change(screen.getByLabelText("Position(s)"), { target: { value: "SP" } });
  fireEvent.change(screen.getByLabelText("Team"), { target: { value: "SF" } });
  mutatePlayerStatus("Status", player.status, "Disabled List", enums.playerStatuses);
  mutatePlayerStatus("League #1 Status", player.league1, "Rostered", enums.leagusStatuses);
  mutatePlayerStatus("League #2 Status", player.league2, "Unavailable", enums.leagusStatuses);
  fireEvent.change(screen.getByLabelText("Draft Rank"), { target: { value: 20 } });
  fireEvent.change(screen.getByLabelText("Drafted %"), { target: { value: 0.07 } });
};

const mutatePlayerStatus = (label, currentValue, newValue, enums) => {
  fireEvent.mouseDown(screen.getByRole("button", { name: `${label} ${enums[currentValue ?? 0]}` }));
  fireEvent.click(screen.getByRole("option", { name: newValue }));
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

test("should handle a cancel", () => {
  let count = 0;
  const onClose = (value) => {
    count++;
    expect(value).toEqual(undefined);
    verifyPlayer(existingPlayer, 40, 0.36, 10, "Nick", "Schultz", 2, 3, "2B-SS", 0, "MIL", 1);
  };
  render(
    <ThemeProvider theme={GlobalTheme()}>
      <PlayerView player={existingPlayer} open={true} onClose={onClose} enums={enums} />
    </ThemeProvider>
  );
  mutatePlayer(existingPlayer);
  fireEvent.click(screen.getByText("Cancel"));
  expect(count).toEqual(1);
});

test("should handle a save", () => {
  let count = 0;
  const onClose = (newPlayer) => {
    count++;
    verifyPlayer(existingPlayer, 40, 0.36, 10, "Nick", "Schultz", 2, 3, "2B-SS", 0, "MIL", 1);
    verifyPlayer(newPlayer, "35", "0.07", "20", "Annie", "Oppman", 1, 2, "SP", 1, "SF", 2);
  };
  render(
    <ThemeProvider theme={GlobalTheme()}>
      <PlayerView player={existingPlayer} open={true} onClose={onClose} enums={enums} />
    </ThemeProvider>
  );
  mutatePlayer(existingPlayer);
  fireEvent.click(screen.getByText("Save"));
  expect(count).toEqual(1);
});

test("should handle a save with no player set", () => {
  let count = 0;
  const onClose = (newPlayer) => {
    count++;
    verifyPlayer(newPlayer, "35", "0.07", "20", "Annie", "Oppman", 1, 2, "SP", 1, "SF", 2);
  };
  render(
    <ThemeProvider theme={GlobalTheme()}>
      <PlayerView open={true} onClose={onClose} enums={enums} />
    </ThemeProvider>
  );
  mutatePlayer({});
  fireEvent.click(screen.getByText("Save"));
  expect(count).toEqual(1);
});

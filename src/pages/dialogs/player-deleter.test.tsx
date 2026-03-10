import { fireEvent, render, screen } from "@testing-library/react";

import GlobalTheme from "../../global-theme";
import { Player } from "../../types/entity-types";
import PlayerDeleter from "./player-deleter";
import { ThemeProvider } from "@mui/material";

const player: Player = {
  age: 0,
  averageDraftPick: 9999,
  averageDraftPickMax: 0,
  averageDraftPickMin: 0,
  battingStats: [],
  firstName: "",
  id: "",
  lastName: "",
  league1: 0,
  league2: 0,
  mayberryMethod: 0,
  mlbAmId: 0,
  name: "MyPlayerName",
  pitchingStats: [],
  positions: [],
  reliability: 0,
  status: 0,
  team: undefined,
  type: 0,
};

const TestWrapper = ({ onClose }) => (
  <ThemeProvider theme={GlobalTheme()}>
    <PlayerDeleter onClose={onClose} open={true} player={player} />
  </ThemeProvider>
);

describe("PlayerDeleter", () => {
  describe("should handle", () => {
    test("a delete being cancelled", () => {
      const onClose = (player) => expect(player).toBeFalsy();
      render(<TestWrapper onClose={onClose} />);
      expect(screen.getByText("Are you sure you want to delete player: MyPlayerName?")).toBeVisible();
      fireEvent.click(screen.getByText("No"));
    });
    test("a delete being approved", () => {
      const onClose = (player) => expect(player.name).toEqual("MyPlayerName");
      render(<TestWrapper onClose={onClose} />);
      expect(screen.getByText("Are you sure you want to delete player: MyPlayerName?")).toBeVisible();
      fireEvent.click(screen.getByText("Yes"));
    });
  });
});

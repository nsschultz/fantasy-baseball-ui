import { fireEvent, render, screen } from "@testing-library/react";

import GlobalTheme from "../global-theme";
import PlayerDeleter from "./player-deleter";
import { ThemeProvider } from "@mui/material";

const TestWrapper = ({ onClose }) => (
  <ThemeProvider theme={GlobalTheme()}>
    <PlayerDeleter onClose={onClose} open={true} player={{ name: "MyPlayerName" }} />
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

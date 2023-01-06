import { addNotification, clearNotifications } from "../../state/slice/notification-slice";
import { fireEvent, render, screen } from "@testing-library/react";

import GlobalTheme from "../../global-theme";
import Notification from "./notification";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material";
import store from "../../state/store";

const notifcations = [
  { key: 1, message: "message1", timestamp: Date.now(), type: "success" },
  { key: 2, message: "message2", timestamp: Date.now(), type: "info" },
  { key: 3, message: "message3", timestamp: Date.now(), type: "error" },
];

const TestWrapper = () => (
  <Provider store={store}>
    <ThemeProvider theme={GlobalTheme()}>
      <Notification />
    </ThemeProvider>
  </Provider>
);

afterEach(() => store.dispatch(clearNotifications()));

describe("Notification", () => {
  describe("should render", () => {
    test("with notifications", () => {
      notifcations.forEach((n) => store.dispatch(addNotification(n)));
      render(<TestWrapper />);
      expect(screen.getAllByRole("button")).toHaveLength(1);
      fireEvent.click(screen.getByRole("button"));
      expect(screen.getAllByRole("button")).toHaveLength(5);
    });
    test("without notifications", () => {
      render(<TestWrapper />);
      expect(screen.getAllByRole("button")).toHaveLength(1);
      fireEvent.click(screen.getByRole("button"));
      expect(screen.getAllByRole("button")).toHaveLength(2);
    });
  });
  describe("should handle", () => {
    test("clearing all of the notifications", () => {
      notifcations.forEach((n) => store.dispatch(addNotification(n)));
      render(<TestWrapper />);
      expect(screen.getAllByRole("button")).toHaveLength(1);
      fireEvent.click(screen.getByRole("button"));
      expect(screen.getAllByRole("button")).toHaveLength(5);
      fireEvent.click(screen.getAllByRole("button")[1]);
      expect(screen.getAllByRole("button")).toHaveLength(2);
    });
  });
});

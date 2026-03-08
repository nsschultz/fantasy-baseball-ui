import { addNotification, clearNotifications } from "../../state/slice/notification-slice";
import { fireEvent, render, screen } from "@testing-library/react";

import GlobalTheme from "../../global-theme";
import Notification from "./notification";
import { NotificationMessage } from "../../types/notification-types";
import { Provider } from "react-redux";
import React from "react";
import { ThemeProvider } from "@mui/material";
import store from "../../state/store";

const notifications: NotificationMessage[] = [
  { message: "message1", notificationKey: 1, timestamp: Date.now(), type: "success" },
  { message: "message2", notificationKey: 2, timestamp: Date.now(), type: "info" },
  { message: "message3", notificationKey: 3, timestamp: Date.now(), type: "error" },
];

const TestWrapper: React.FC = () => (
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
      notifications.forEach((n) => store.dispatch(addNotification(n)));
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
      notifications.forEach((n) => store.dispatch(addNotification(n)));
      render(<TestWrapper />);
      expect(screen.getAllByRole("button")).toHaveLength(1);
      fireEvent.click(screen.getByRole("button"));
      expect(screen.getAllByRole("button")).toHaveLength(5);
      fireEvent.click(screen.getAllByRole("button")[1]);
      expect(screen.getAllByRole("button")).toHaveLength(2);
    });
  });
});

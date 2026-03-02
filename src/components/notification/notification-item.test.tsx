import { fireEvent, render, screen } from "@testing-library/react";

import GlobalTheme from "../../global-theme";
import NotificationItem from "./notification-item";
import { NotificationType } from "../../types/types";
import { Provider } from "react-redux";
import React from "react";
import { ThemeProvider } from "@mui/material";
import { addNotification } from "../../state/slice/notification-slice";
import store from "../../state/store";

const TestWrapper: React.FC<{ notification: Readonly<NotificationType> }> = ({ notification }) => (
  <Provider store={store}>
    <ThemeProvider theme={GlobalTheme()}>
      <NotificationItem {...notification} />
    </ThemeProvider>
  </Provider>
);

describe("NotificationItem", () => {
  describe("should create a notification with a", () => {
    test("Info Icon", () => {
      render(<TestWrapper notification={{ notificationKey: 1, message: "this is informational", timestamp: Date.now(), type: "info" }} />);
      expect(screen.getByTestId("InfoOutlinedIcon")).toBeVisible();
      expect(screen.getByText("this is informational")).toBeVisible();
    });
    test("Error Icon", () => {
      render(<TestWrapper notification={{ notificationKey: 1, message: "this is an error", timestamp: Date.now(), type: "error" }} />);
      expect(screen.getByTestId("ErrorOutlineOutlinedIcon")).toBeVisible();
      expect(screen.getByText("this is an error")).toBeVisible();
    });
    test("Success Icon", () => {
      render(<TestWrapper notification={{ notificationKey: 1, message: "this is successful", timestamp: Date.now(), type: "success" }} />);
      expect(screen.getByTestId("CheckCircleOutlineOutlinedIcon")).toBeVisible();
      expect(screen.getByText("this is successful")).toBeVisible();
    });
  });
  describe("should fire a clear command on click", () => {
    const notifcation: NotificationType = { notificationKey: 1, message: "this message should get cleared", timestamp: Date.now(), type: "error" };
    store.dispatch(addNotification(notifcation));
    expect(store.getState().notification.value).toHaveLength(1);
    render(<TestWrapper notification={notifcation} />);
    expect(screen.getByTestId("ErrorOutlineOutlinedIcon")).toBeVisible();
    expect(screen.getByText("this message should get cleared")).toBeVisible();
    fireEvent.click(screen.getByRole("button"));
    expect(store.getState().notification.value).toHaveLength(0);
  });
});

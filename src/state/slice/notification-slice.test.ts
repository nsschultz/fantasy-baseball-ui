import { addNotification, clearNotifications, removeNotification } from "./notification-slice";

import { NotificationMessage } from "../../types/basic-types";
import store from "../store";

const notifications: NotificationMessage[] = [
  { notificationKey: 1, message: "message1", timestamp: Date.now(), type: "success" },
  { notificationKey: 2, message: "message2", timestamp: Date.now(), type: "info" },
  { notificationKey: 3, message: "message3", timestamp: Date.now(), type: "error" },
];

describe("NotificationSlice", () => {
  test("should handle adding and clearing notifications", () => {
    expect(store.getState().notification.value).toHaveLength(0);
    notifications.forEach((n) => store.dispatch(addNotification(n)));
    expect(store.getState().notification.value).toHaveLength(3);
    store.dispatch(removeNotification(notifications[0]));
    expect(store.getState().notification.value).toHaveLength(2);
    store.dispatch(removeNotification({ notificationKey: 4 }));
    expect(store.getState().notification.value).toHaveLength(2);
    store.dispatch(clearNotifications());
    expect(store.getState().notification.value).toHaveLength(0);
  });
});

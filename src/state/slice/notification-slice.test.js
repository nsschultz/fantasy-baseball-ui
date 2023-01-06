import { addNotification, clearNotifications, removeNotification } from "./notification-slice";

import store from "../store";

const notifcations = [
  { key: 1, message: "message1", timestamp: Date.now(), type: "success" },
  { key: 2, message: "message2", timestamp: Date.now(), type: "info" },
  { key: 3, message: "message3", timestamp: Date.now(), type: "error" },
];

describe("NotificationSlice", () => {
  test("should handle adding and clearing notifications", () => {
    expect(store.getState().notification.value).toHaveLength(0);
    notifcations.forEach((n) => store.dispatch(addNotification(n)));
    expect(store.getState().notification.value).toHaveLength(3);
    store.dispatch(removeNotification(notifcations[0]));
    expect(store.getState().notification.value).toHaveLength(2);
    store.dispatch(removeNotification({ key: 4, message: "message3", timestamp: Date.now(), type: "error" }));
    expect(store.getState().notification.value).toHaveLength(2);
    store.dispatch(clearNotifications());
    expect(store.getState().notification.value).toHaveLength(0);
  });
});

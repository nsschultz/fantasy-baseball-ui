import { createSlice } from "@reduxjs/toolkit";

/**
 * Slice for notifications. Notifications are:
 * @param {number}   notification.key       (Required) The unique id of the notification.
 * @param {string}   notification.message   (Required) The message to be displayed.
 * @param {number}   notification.timestamp (Required) The time (in milliseconds) when the notification was created.
 * @param {string}   notification.type      (Required) The type: success, info, or error.
 */
export const notificationSlice = createSlice({
  name: "notification",
  initialState: { value: [] },
  reducers: {
    addNotification: (state, action) => {
      state.value.push(action.payload);
    },
    clearNotifications: (state) => {
      state.value = [];
    },
    removeNotification: (state, action) => {
      const index = state.value.map((v) => v.key).indexOf(action.payload.key);
      if (index > -1) state.value.splice(index, 1);
    },
  },
});
export const { addNotification, clearNotifications, removeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;

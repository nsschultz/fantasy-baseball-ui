import { NotificationMessage, NotificationState } from "../../types/notification-types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: NotificationState = { value: [] };

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<NotificationMessage>) => {
      state.value.push(action.payload);
    },
    clearNotifications: (state) => {
      state.value = [];
    },
    removeNotification: (state, action: PayloadAction<{ notificationKey: number }>) => {
      const index = state.value.map((v) => v.notificationKey).indexOf(action.payload.notificationKey);
      if (index > -1) state.value.splice(index, 1);
    },
  },
});

export const { addNotification, clearNotifications, removeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;

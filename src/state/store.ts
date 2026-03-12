import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./slice/notification-slice";
import playerFilterReducer from "./slice/player-filter-slice";

const store = configureStore({ reducer: { notification: notificationReducer, playerFilter: playerFilterReducer } });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./slice/notification-slice";
import playerFilterSlice from "./slice/player-filter-slice";

export default configureStore({ reducer: { notification: notificationReducer, playerFilter: playerFilterSlice } });

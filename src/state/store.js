import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./slice/notification-slice";

export default configureStore({ reducer: { notification: notificationReducer } });

import { createSlice } from "@reduxjs/toolkit";

/**
 * Slice for player filters. Player Filters are:
 * @param {string}   notification.key   The key used to lookup the values.
 * @param {*}        notification.value The value(s) being filtered on. Anything can be set for this and key should determine how it's handled.
 */
export const playerFilterSlice = createSlice({
  name: "player-filter",
  initialState: {
    value: { name: "", l1statuses: [], l2statuses: [], positions: [], statuses: [], teams: [], types: [] },
  },
  reducers: {
    modifyFilter: (state, action) => {
      state.value[action.payload.key] = action.payload.value;
    },
  },
});
export const { modifyFilter } = playerFilterSlice.actions;
export default playerFilterSlice.reducer;

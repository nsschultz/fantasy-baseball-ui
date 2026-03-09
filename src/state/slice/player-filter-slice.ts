import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PlayerFilterModification, PlayerFilterStateType } from "../../types/implementation-types";

const initialState: PlayerFilterStateType = {
  value: { name: "", l1statuses: [], l2statuses: [], positions: [], statuses: [], teams: [], types: [] },
};

export const playerFilterSlice = createSlice({
  name: "player-filter",
  initialState,
  reducers: {
    modifyFilter: (state, action: PayloadAction<PlayerFilterModification>) => {
      const { key, value } = action.payload;
      state.value[key] = value;
    },
  },
});

export const { modifyFilter } = playerFilterSlice.actions;
export default playerFilterSlice.reducer;

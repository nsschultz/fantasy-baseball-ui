import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PlayerFilterKey, PlayerFilterModification, PlayerFilterStateType, PlayerFilterType } from "../../types/player-filter-types";

const initialState: PlayerFilterStateType = {
  value: { name: "", l1statuses: [], l2statuses: [], positions: [], statuses: [], teams: [], types: [] },
};

export const playerFilterSlice = createSlice({
  name: "player-filter",
  initialState,
  reducers: {
    modifyFilter: (state, action: PayloadAction<PlayerFilterModification>) => {
      const { key, value } = action.payload;
      (state.value[key] as PlayerFilterType[PlayerFilterKey]) = value;
    },
  },
});

export const { modifyFilter } = playerFilterSlice.actions;
export default playerFilterSlice.reducer;

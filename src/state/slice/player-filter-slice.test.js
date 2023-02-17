import { modifyFilter } from "./player-filter-slice";
import store from "../store";

describe("PlayerFilterSlice", () => {
  test("should have default values", () => {
    expect(store.getState().playerFilter.value.name).toEqual("");
    expect(store.getState().playerFilter.value.l1statuses).toHaveLength(0);
    expect(store.getState().playerFilter.value.l2statuses).toHaveLength(0);
    expect(store.getState().playerFilter.value.positions).toHaveLength(0);
    expect(store.getState().playerFilter.value.statuses).toHaveLength(0);
    expect(store.getState().playerFilter.value.teams).toHaveLength(0);
    expect(store.getState().playerFilter.value.types).toHaveLength(0);
  });
  test("should handle a filter being modified", () => {
    expect(store.getState().playerFilter.value.types).toEqual([]);
    store.dispatch(modifyFilter({ key: "types", value: [0, 1, 2] }));
    expect(store.getState().playerFilter.value.types).toEqual([0, 1, 2]);
    store.dispatch(modifyFilter({ key: "types", value: [] }));
    expect(store.getState().playerFilter.value.types).toEqual([]);
  });
});

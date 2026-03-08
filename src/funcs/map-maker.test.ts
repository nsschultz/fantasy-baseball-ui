import { makeMap } from "./map-maker";

interface SimpleMapItem {
  key: number;
  value: string;
}

const simpleMap: (SimpleMapItem | null)[] = [{ key: 1, value: "value1" }, { key: 2, value: "value2" }, null];

const simpleMaker = <T>(obj: T): T => obj;

describe("makeMap", () => {
  describe("should return empty object if", () => {
    test("values is not set", () => expect(makeMap(null, simpleMaker, simpleMaker)).toEqual({}));
    test("values is empty", () => expect(makeMap([], simpleMaker, simpleMaker)).toEqual({}));
    test("keyMaker is not set", () => expect(makeMap(simpleMap, null, simpleMaker)).toEqual({}));
    test("valueMaker is not set", () => expect(makeMap(simpleMap, simpleMaker, null)).toEqual({}));
  });
  test("should return a proper object when valid inputs are given", () => {
    const keyMaker = (obj: SimpleMapItem): number => obj.key;
    const valueMaker = (obj: SimpleMapItem): string => obj.value;
    expect(makeMap(simpleMap, keyMaker, valueMaker)).toEqual({ 1: "value1", 2: "value2" });
  });
});

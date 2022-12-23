import { makeMap } from "./map-maker";

const simpleMaker = (obj) => obj;
const simpleMap = [{ key: 1, value: "value1" }, { key: 2, value: "value2" }, null];

describe("makeMap", () => {
  describe("should return empty object if", () => {
    xtest("values is not set", () => expect(makeMap(null, simpleMaker, simpleMaker)).toEqual({}));
    xtest("values is empty", () => expect(makeMap([], simpleMaker, simpleMaker)).toEqual({}));
    xtest("keyMaker is not set", () => expect(makeMap(simpleMap, null, simpleMaker)).toEqual({}));
    xtest("valueMaker is not set", () => expect(makeMap(simpleMap, simpleMaker, null)).toEqual({}));
  });
  xtest("should return a proper object when valid inputs are given", () => {
    const keyMaker = (obj) => obj.key;
    const valueMaker = (obj) => obj.value;
    expect(makeMap(simpleMap, keyMaker, valueMaker)).toEqual({ 1: "value1", 2: "value2" });
  });
});

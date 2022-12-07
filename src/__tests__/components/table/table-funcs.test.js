import { getAlign } from "../../../components/table/table-funcs";

test("should get correct alignment for null", () => {
  expect(getAlign({})).toEqual("left");
});

test("should get correct alignment for numeric", () => {
  expect(getAlign({ type: "numeric" })).toEqual("right");
});

test("should get correct alignment for string", () => {
  expect(getAlign({ type: "string" })).toEqual("left");
});

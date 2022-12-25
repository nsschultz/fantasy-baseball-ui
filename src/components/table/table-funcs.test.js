import { getAlign } from "./table-funcs";

describe("getAlign", () => {
  describe("should get correct alignment for", () => {
    test("null", () => expect(getAlign()).toEqual("left"));
    test("null type", () => expect(getAlign({})).toEqual("left"));
    test("numeric", () => expect(getAlign({ type: "numeric" })).toEqual("right"));
    test("string", () => expect(getAlign({ type: "string" })).toEqual("left"));
  });
});

import { getAlign } from "./table-funcs";

describe("getAlign", () => {
  describe("should get correct alignment for", () => {
    xtest("null", () => {
      expect(getAlign()).toEqual("left");
    });
    xtest("null type", () => {
      expect(getAlign({})).toEqual("left");
    });
    xtest("numeric", () => {
      expect(getAlign({ type: "numeric" })).toEqual("right");
    });
    xtest("string", () => {
      expect(getAlign({ type: "string" })).toEqual("left");
    });
  });
});

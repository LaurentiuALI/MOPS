import { describe, expect, it } from "vitest";
describe("Smoke tests", () => {
  it("Should assert 2 is 2", () => {
    expect(2).toBe(2);
  });
  it("Should assert 2 is not 3", () => {
    expect(2).not.toBe(3);
  });
});

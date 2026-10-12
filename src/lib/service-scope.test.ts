import { describe, expect, it } from "vitest";
import { isWithinServiceScope } from "./service-scope";

describe("AFON repair eligibility", () => {
  it("requires combined labor and materials to be strictly under $1,000", () => {
    expect(isWithinServiceScope(700, 299.99, false)).toBe(true);
    expect(isWithinServiceScope(700, 300, false)).toBe(false);
    expect(isWithinServiceScope(700, 301, false)).toBe(false);
  });
  it("excludes work requiring a building permit", () => {
    expect(isWithinServiceScope(100, 100, true)).toBe(false);
    expect(isWithinServiceScope(100, 100, false)).toBe(true);
  });
});

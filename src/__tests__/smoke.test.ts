import { describe, it, expect } from "vitest";

describe("smoke test", () => {
  it("truthy values are truthy", () => {
    expect(true).toBe(true);
  });

  it("basic arithmetic works", () => {
    expect(1 + 1).toBe(2);
  });
});

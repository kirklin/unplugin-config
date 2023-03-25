import { describe, expect, it } from "vitest";

import { sanitizeString } from "../src/core/utils";

describe("sanitizeString", () => {
  it("should remove invalid characters and trim whitespace", () => {
    expect(sanitizeString("a bc !@ \n#1 23")).toBe("abc123");
    expect(sanitizeString("hello World")).toBe("helloWorld");
    expect(sanitizeString("a_b.c-d")).toBe("a_b.c__d");
    expect(sanitizeString(" ")).toBe("");
    expect(sanitizeString("  \t ")).toBe("");
  });

  it("replaces hyphens with double underscores", () => {
    expect(sanitizeString("a-b-c")).toBe("a__b__c");
    expect(sanitizeString("")).toBe("");
    expect(sanitizeString("-")).toBe("__");
    expect(sanitizeString("--")).toBe("____");
  });

  it("trims whitespace", () => {
    expect(sanitizeString("  abc  ")).toBe("abc");
    expect(sanitizeString("\tdef\t")).toBe("def");
    expect(sanitizeString("\nghi\n")).toBe("ghi");
    expect(sanitizeString("  ")).toBe("");
  });
});

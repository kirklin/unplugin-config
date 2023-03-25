import { describe, expect, it } from "vitest";

import { getAppConfigFileName } from "../src/core/unplugin";

describe("getAppConfigFileName", () => {
  it("should return a string in the correct format", () => {
    expect(getAppConfigFileName({ appName: "my-app" })).toBe("__PRODUCTION__MY__APP__CONF__");
    expect(getAppConfigFileName({ appName: "my app" })).toBe("__PRODUCTION__MYAPP__CONF__");
    expect(getAppConfigFileName({ appName: "my =-)(*&^%$app" })).toBe("__PRODUCTION__MY__APP__CONF__");
  });

  it("should use the default app name if no options are provided", () => {
    expect(getAppConfigFileName()).toBe("__PRODUCTION__UNPLUGIN__CONFIG__CONF__");
  });
});

import process from "node:process";
import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { getAppConfigFileName, getEnvConfig, runBuildConfig } from "../src/core/unplugin";

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

describe("getEnvConfig", () => {
  it("should return environment variables starting with the specified prefix", () => {
    process.env.NODE_ENV = "test";
    process.env.PLUGIN_NAME = "unplugin-config";
    process.env.PLUGIN_GLOB_CONFIG_FILE_NAME = "_app.config.js";
    process.env.OUTPUT_DIR = "test";
    process.env.ENV_CONFIG_PREFIX = "PLUGIN_";

    const result = getEnvConfig(process.env.ENV_CONFIG_PREFIX);
    expect(Object.keys(result)).toHaveLength(2);
    expect(result).toHaveProperty("PLUGIN_NAME", "unplugin-config");
    expect(result).toHaveProperty("PLUGIN_GLOB_CONFIG_FILE_NAME", "_prod.config.js");
    expect(result).not.toHaveProperty("OUTPUT_DIR");
    expect(result).not.toHaveProperty("ENV_CONFIG_PREFIX");
  });
});

describe("runBuildConfig", () => {
  it("should create a config file", () => {
    const options = {
      appName: "UNPLUGIN-CONFIG",
      envVariables: {
        prefix: "VITE_GLOB_",
      },
      configFile: {
        generate: true,
        fileName: "_test_config.js",
        outputDir: "test",
      },
    };

    runBuildConfig(options);
    const outputPath = path.resolve(process.cwd(), options.configFile.outputDir);
    const configFilePath = path.resolve(outputPath, options.configFile.fileName);
    const config = fs.readFileSync(configFilePath, { encoding: "utf8" });

    expect(config).toMatch("window.__PRODUCTION__UNPLUGIN__CONFIG__CONF__");
  });
});

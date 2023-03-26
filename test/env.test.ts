import { afterAll, beforeAll, describe, expect, it } from "vitest";
describe("env variables", () => {
  beforeAll(() => {
    process.env.NODE_ENV = "test";
    process.env.PLUGIN_NAME = "unplugin-config";
    process.env.PLUGIN_GLOB_CONFIG_FILE_NAME = "_app.config.js";
    process.env.OUTPUT_DIR = "dist";
    process.env.ENV_CONFIG_PREFIX = "PLUGIN_";
  });

  afterAll(() => {
    delete process.env.NODE_ENV;
    delete process.env.PLUGIN_NAME;
    delete process.env.PLUGIN_GLOB_CONFIG_FILE_NAME;
    delete process.env.OUTPUT_DIR;
    delete process.env.ENV_CONFIG_PREFIX;
  });

  it("should have NODE_ENV set to \"test\"", () => {
    expect(process.env.NODE_ENV).toEqual("test");
  });

  it("should have PLUGIN_NAME set to \"unplugin-config\"", () => {
    expect(process.env.PLUGIN_NAME).toEqual("unplugin-config");
  });

  it("should have PLUGIN_GLOB_CONFIG_FILE_NAME set to \"_app.config.js\"", () => {
    expect(process.env.PLUGIN_GLOB_CONFIG_FILE_NAME).toEqual("_app.config.js");
  });

  it("should have OUTPUT_DIR set to \"dist\"", () => {
    expect(process.env.OUTPUT_DIR).toEqual("dist");
  });

  it("should have ENV_CONFIG_PREFIX set to \"PLUGIN_\"", () => {
    expect(process.env.ENV_CONFIG_PREFIX).toEqual("PLUGIN_");
  });
});

import { resolve } from "node:path";
import { createUnplugin } from "unplugin";
import { logger } from "@kirklin/logger";
import { mkdirp, readFileSync, writeFileSync } from "fs-extra";
import { cyan, gray, green, red } from "picocolors";
import dotenv from "dotenv";
import type { BuildConfigOptions, Options } from "../types";
import { APP_NAME, ENV_CONFIG_PREFIX, GLOB_CONFIG_FILE_NAME, OUTPUT_DIR, PLUGIN_NAME } from "./constants";

export function getAppConfigFileName(options?: Options): string {
  const shortName: string = options?.appName || APP_NAME;
  return `__PRODUCTION__${shortName.replace(/-/g, "__")}__CONF__`.toUpperCase().replace(/\s/g, "");
}
export function runBuildConfig(options?: Options) {
  const config = getEnvConfig(options?.envConfigPrefix);
  logger.info(`[${PLUGIN_NAME}]runBuildConfig: ${JSON.stringify(config)}`);
  const configFileName = getAppConfigFileName(options);
  logger.info(`[${PLUGIN_NAME}]configFileName: ${configFileName}`);
  createConfig({
    configName: configFileName,
    config,
    configFileName: options?.globConfigFileName,
    outputDir: options?.outputDir || OUTPUT_DIR,
    appName: options?.appName || APP_NAME,
  });
}

function createConfig({ configName, config, configFileName, outputDir, appName }: BuildConfigOptions) {
  try {
    const windowConf = `window.${configName}`;
    const configStr = `${windowConf}=${JSON.stringify(config)};
      Object.freeze(${windowConf});
      Object.defineProperty(window, "${configName}", {
        configurable: false,
        writable: false,
      });`.replace(/\s/g, "");

    const outputPath = resolve(process.cwd(), outputDir);
    void mkdirp(outputPath).then();

    writeFileSync(
      resolve(outputPath, configFileName || GLOB_CONFIG_FILE_NAME),
      configStr,
    );

    logger.info(`${cyan(`✨ [${appName}]`)} - configuration file is built successfully:\n${gray(`${outputDir}/${green(configFileName)}`)}`);
  } catch (error) {
    logger.info(red(`[${PLUGIN_NAME}]configuration file failed to package:\n${error instanceof Error ? error.message : String(error)}`));
  }
}

/**
 * Get the names of the configuration files that are in effect in the current environment
 */
function getEnvConfigFiles(): string[] {
  const script = process.env.npm_lifecycle_script || "";
  const reg = /--mode ([a-z_\d]+)/;
  const mode = reg.exec(script)?.[1] || "production";
  return [`.env.${mode}`, ".env"];
}

/**
 * Get the environment variables starting with the specified prefix
 * @param prefix prefix
 * @param files ext
 */
function getEnvConfig(prefix = ENV_CONFIG_PREFIX, files = getEnvConfigFiles()) {
  let envConfig = {};

  files.forEach((file) => {
    try {
      const env = dotenv.parse(readFileSync(resolve(process.cwd(), file)));
      envConfig = { ...envConfig, ...env };
    } catch (e) {
      console.error(`[${PLUGIN_NAME}]Error in parsing ${file}`, e);
    }
  });

  const reg = new RegExp(`^(${prefix})`);

  Object.keys(envConfig).forEach((key) => {
    if (!reg.test(key)) {
      Reflect.deleteProperty(envConfig, key);
    }
  });

  return envConfig;
}

/**
 * When used for packaging, this function generates additional configuration files that can be externally modified without the need for repackaging.
 * These configuration files may contain global variables that are customizable.
 *
 */
export default createUnplugin<Options | undefined>(options => ({
  name: PLUGIN_NAME,
  writeBundle() {
    try {
      // Generate configuration file
      if (!options?.disabledConfig) {
        runBuildConfig(options);
      }

      logger.info(`${cyan(`✨ [${options?.appName || APP_NAME}]`)} - build successfully!`);
    } catch (error) {
      red(`[${PLUGIN_NAME}]vite build error:\n${error instanceof Error ? error.message : String(error)}`);
      process.exit(1);
    }
  },
}));

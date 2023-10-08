import process from "node:process";
import path, { resolve } from "node:path";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import type { UnpluginFactory } from "unplugin";
import { logger } from "@kirklin/logger";
import dotenv from "dotenv";
import type { BuildConfigOptions, Options } from "../types";
import {
  APP_NAME,
  ENV_CONFIG_PREFIX,
  GLOB_CONFIG_FILE_NAME,
  OUTPUT_BASE_DIR,
  OUTPUT_DIR,
  PLUGIN_NAME,
} from "./constants";
import { addHeadTag, addScriptToHead, formatPath, sanitizeString } from "./utils";

/**
 * Get the application configuration file name
 * @param options Options
 * @returns Application configuration file name
 */
export function getAppConfigFileName(options?: Options): string {
  const shortName: string = sanitizeString((options?.appName || APP_NAME));
  return `__PRODUCTION__${shortName}__CONF__`.toUpperCase();
}

/**
 * Run build configuration
 * @param options Options
 */
export function runBuildConfig(options?: Options) {
  const config = getEnvConfig(options?.envConfigPrefix);
  logger.info(`[${PLUGIN_NAME}] runBuildConfig: ${JSON.stringify(config)}`);
  const configFileName = getAppConfigFileName(options);
  logger.info(`[${PLUGIN_NAME}] configFileName: ${configFileName}`);
  createConfig({
    configName: configFileName,
    config,
    configFileName: options?.globConfigFileName,
    outputDir: options?.outputDir || OUTPUT_DIR,
    appName: options?.appName || APP_NAME,
  });
}

/**
 * Create a configuration file
 * @param configName Configuration name
 * @param config Configuration
 * @param configFileName Configuration file name
 * @param outputDir Output directory
 * @param appName Application name
 */
export function createConfig({ configName, config, configFileName, outputDir, appName }: BuildConfigOptions) {
  try {
    const windowConf = `window.${configName}`;
    const configStr = `${windowConf}=${JSON.stringify(config)};
      Object.freeze(${windowConf});
      Object.defineProperty(window, "${configName}", {
        configurable: false,
        writable: false,
      });`.replace(/\n\s*/g, "");

    const outputPath = resolve(process.cwd(), outputDir);
    mkdirSync(outputPath, { recursive: true });

    writeFileSync(
      resolve(outputPath, configFileName || GLOB_CONFIG_FILE_NAME),
      configStr,
    );

    logger.info(`✨ [${appName}] - Configuration file is built successfully:\n${outputDir}/${configFileName || GLOB_CONFIG_FILE_NAME}`);
  } catch (error) {
    logger.info(`[${PLUGIN_NAME}] Configuration file failed to package:\n${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Get the names of the configuration files that are in effect in the current environment
 * @returns Configuration file names
 */
export function getEnvConfigFiles(): string[] {
  const script = process.env.npm_lifecycle_script || "";
  const reg = /--mode ([a-z_\d]+)/;
  const mode = reg.exec(script)?.[1] || "production";
  return [`.env.${mode}`, ".env"];
}

/**
 * Get the environment variables starting with the specified prefix
 * @param prefix Prefix
 * @param files Files
 * @returns Environment variables object
 */
export function getEnvConfig(prefix = ENV_CONFIG_PREFIX, files = getEnvConfigFiles()) {
  let envConfig = {};

  files.forEach((file) => {
    try {
      const env = dotenv.parse(readFileSync(resolve(process.cwd(), file)));
      envConfig = { ...envConfig, ...env };
    } catch (e) {
      console.error(`[${PLUGIN_NAME}] Error in parsing ${file}`, e);
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
export const unpluginFactory: UnpluginFactory<Options | undefined> = (options, meta) => {
  const { framework } = meta;
  const ENABLE_PLUGIN = !options?.disabledConfig ?? true;
  return {
    name: PLUGIN_NAME,
    writeBundle() {
      try {
        // Generate configuration file
        if (ENABLE_PLUGIN) {
          runBuildConfig(options);
        }

        logger.info(`✨ [${options?.appName || APP_NAME}] - Build successfully!`);
      } catch (error) {
        console.error(`[${PLUGIN_NAME}] Vite build error:\n${error instanceof Error ? error.message : String(error)}`);
        process.exit(1);
      }
    },
    transformInclude(id: string) {
      const formatId = formatPath(id);
      let shouldTransform = false;
      if (ENABLE_PLUGIN) {
        if (!(options?.enableInject ?? true)) {
          return shouldTransform;
        }
        // WARN: Currently, webpack does not support directly injecting HTML in this way.
        // You may need an additional loader to handle the result of these loaders.
        if (formatId.endsWith(".html") && framework !== "webpack") {
          const covertTemplates
              = options?.templates?.map(template => formatPath(path.resolve(process.cwd(), template))) ?? [];
          if (!covertTemplates?.length || covertTemplates.includes(formatId)) {
            shouldTransform = true;
          }
        }
      }
      return shouldTransform;
    },
    transform(code: string) {
      // Example usage
      let htmlCode = code;
      htmlCode = addHeadTag(code); // Add <head> tag
      const BASE_DIR = options?.baseDir ?? OUTPUT_BASE_DIR;
      const path = BASE_DIR.endsWith("/") ? options?.baseDir : `${options?.baseDir}/`;

      const configFileName = options?.globConfigFileName || GLOB_CONFIG_FILE_NAME;
      const getAppConfigSrc = () => {
        return `${path || "/"}${configFileName}`;
      };

      htmlCode = addScriptToHead(code, getAppConfigSrc()); // Add JS script
      return htmlCode;
    },
  };
};

import process from "node:process";
import path, { resolve } from "node:path";
import type { UnpluginFactory } from "unplugin";
import { logger } from "@kirklin/logger";
import { mkdirp, readFileSync, writeFileSync } from "fs-extra";
import { cyan, gray, green, red } from "picocolors";
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

export function getAppConfigFileName(options?: Options): string {
  const shortName: string = sanitizeString((options?.appName || APP_NAME));
  return `__PRODUCTION__${shortName}__CONF__`.toUpperCase();
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

export function createConfig({ configName, config, configFileName, outputDir, appName }: BuildConfigOptions) {
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
export function getEnvConfigFiles(): string[] {
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
export function getEnvConfig(prefix = ENV_CONFIG_PREFIX, files = getEnvConfigFiles()) {
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

        logger.info(`${cyan(`✨ [${options?.appName || APP_NAME}]`)} - build successfully!`);
      } catch (error) {
        red(`[${PLUGIN_NAME}]vite build error:\n${error instanceof Error ? error.message : String(error)}`);
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
        // WARN: 目前 webpack 不支持这样直接注入 html，得改用 webpack(compiler) 写法，不然会报以下错误
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
      // 调用示例
      let htmlCode = code;
      htmlCode = addHeadTag(code); // 添加<head>标签
      const BASE_DIR = options?.baseDir ?? OUTPUT_BASE_DIR;
      const path = BASE_DIR.endsWith("/") ? options?.baseDir : `${options?.baseDir}/`;

      const configFileName = options?.globConfigFileName || GLOB_CONFIG_FILE_NAME;
      const getAppConfigSrc = () => {
        return `${path || "/"}${configFileName}`;
      };

      htmlCode = addScriptToHead(code, getAppConfigSrc()); // 添加JS脚本
      return htmlCode;
    },
  };
};

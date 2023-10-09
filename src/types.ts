/**
 * Represents the options for the configuration plugin.
 * 表示配置插件的选项。
 */
export interface Options {
  // The name of the application.
  // 应用程序的名称。
  appName?: string;

  // The base directory for the output.
  // 输出的基本目录。
  baseDir?: string;

  // Configuration file options.
  // 配置文件选项。
  configFile?: {
    // Enable or disable generating the configuration file.
    // 启用或禁用生成配置文件。
    generate?: boolean;

    // The name of the global configuration file.
    // 全局配置文件的名称。
    fileName?: string;

    // The output directory for the configuration file.
    // 配置文件的输出目录。
    outputDir?: string;
  };

  // HTML injection options.
  // HTML 注入选项。
  htmlInjection?: {
    // Enable or disable injecting configuration into HTML files.
    // 启用或禁用将配置注入到 HTML 文件中。
    enable?: boolean;

    // An array of template files to transform.
    // 要转换的模板文件的数组。
    templates?: string[];

    // HTML injection position options.
    // HTML 注入位置选项。
    position?: "head" | "body" | "head-prepend" | "body-prepend";

    // Custom HTML injection position.
    // 自定义 HTML 注入位置。
    customPosition?: string;
  };

  // Environment variables options.
  // 环境变量选项。
  envVariables?: {
    // The prefix for environment variables used in configuration.
    // 用于配置中的环境变量的前缀。
    prefix?: string;

    // An array of configuration files to load environment variables from.
    // 从中加载环境变量的配置文件数组。
    files?: string[];
  };
}

/**
 * Represents the options for building a configuration file.
 * 表示构建配置文件的选项。
 */
export interface BuildConfigOptions {
  // The name of the configuration.
  // 配置的名称。
  configName: string;

  // The configuration data.
  // 配置数据。
  config: any;

  // The name of the configuration file.
  // 配置文件的名称。
  configFileName?: string;

  // The name of the application.
  // 应用程序的名称。
  appName?: string;

  // The output directory for the configuration file.
  // 配置文件的输出目录。
  outputDir: string;
}

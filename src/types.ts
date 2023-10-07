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

  // Disable generating configuration file.
  // 禁用生成配置文件。
  disabledConfig?: boolean;

  // Enable injecting configuration into HTML files.
  // 启用将配置注入到 HTML 文件中。
  enableInject?: boolean;

  // The prefix for environment variables used in configuration.
  // 用于配置中的环境变量的前缀。
  envConfigPrefix?: string;

  // The name of the global configuration file.
  // 全局配置文件的名称。
  globConfigFileName?: string;

  // The output directory for the configuration file.
  // 配置文件的输出目录。
  outputDir?: string;

  // An array of template files to transform.
  // 要转换的模板文件的数组。
  templates?: string[];
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

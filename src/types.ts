export interface Options {
  disabledConfig?: boolean;
  globConfigFileName?: string;
  baseDir?: string;
  outputDir?: string;
  appName?: string;
  version?: string;
  envConfigPrefix?: string;
  enableInject?: boolean;
  templates?: string[];
}

export interface BuildConfigOptions {
  configName: string;
  config: any;
  configFileName?: string;
  outputDir: string;
  appName?: string;
}

export interface Options {
  disabledConfig?: boolean;
  globConfigFileName?: string;
  outputDir?: string;
  appName?: string;
  envConfigPrefix?: string;
}

export interface BuildConfigOptions {
  configName: string;
  config: any;
  configFileName?: string;
  outputDir: string;
  appName?: string;
}

/* eslint-disable @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment */
import type { Options } from "./types";
import unplugin from ".";
export default function (options: Options = {}, nuxt: any) {
  // install webpack plugin
  nuxt.hook("webpack:config", (config: any) => {
    config.plugins = config.plugins || [];
    config.plugins.unshift(unplugin.webpack(options));
  });

  // install vite plugin
  nuxt.hook("vite:extendConfig", (config: any) => {
    config.plugins = config.plugins || [];
    config.plugins.push(unplugin.vite(options));
  });
}

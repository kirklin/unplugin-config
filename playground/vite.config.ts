import { defineConfig } from "vite";
import Inspect from "vite-plugin-inspect";
import Unplugin from "../src/vite";

export default defineConfig({
  plugins: [
    Inspect(),
    Unplugin({
      appName: "Celeris-Admin",
      configFile: {
        generate: true,
        fileName: "_app.config.js",
        outputDir: "dist",
      },
      htmlInjection: {
        enable: true,
      },
      envVariables: {
        prefix: "VITE_GLOB_",
      },
    }),
  ],
});

import { defineConfig } from "vite";
import Inspect from "vite-plugin-inspect";
import Unplugin from "../src/vite";

export default defineConfig({
  plugins: [
    Inspect(),
    Unplugin({
      disabledConfig: false,
      globConfigFileName: "_app.config.js",
      outputDir: "dist",
      appName: "Celeris Admin",
      envConfigPrefix: "VITE_GLOB_",
    }),
  ],
});

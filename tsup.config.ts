import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "src/*.ts",
  ],
  format: ["cjs", "esm"],
  splitting: true,
  clean: true,
  dts: true,
  onSuccess: "npm run build:fix",
  external: ["dotenv", "jsdom", "html-entities"],
});

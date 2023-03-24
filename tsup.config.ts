import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src"],
  format: ["cjs", "esm"],
  splitting: true,
  clean: true,
  dts: true,
  onSuccess: "npm run build:fix",
});

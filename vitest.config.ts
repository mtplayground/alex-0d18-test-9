import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { configDefaults, defineConfig } from "vitest/config";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": projectRoot,
    },
  },
  test: {
    css: true,
    environment: "jsdom",
    exclude: [...configDefaults.exclude, "tests/e2e/**"],
    globals: true,
    setupFiles: "./test/setup.ts",
  },
});

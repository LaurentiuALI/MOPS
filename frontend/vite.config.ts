/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { configDefaults } from "vitest/dist/config.js";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    exclude: [...configDefaults.exclude],
    environment: "jsdom",
    coverage: {
      provider: "istanbul",
      all: true,
    },
    setupFiles: ["./setupTest.ts"],
  },
});

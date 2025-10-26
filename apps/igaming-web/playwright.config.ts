import { defineConfig, devices } from "@playwright/test";
import { loadEnv } from "vite";

const env = loadEnv("development", process.cwd(), "");

export default defineConfig({
  testDir: "./src/test/e2e",
  fullyParallel: true,
  reporter: "html",
  use: {
    baseURL: `http://localhost:${env.VITE_PORT || 5173}`,
    trace: "on-first-retry",
    ignoreHTTPSErrors: true,
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});

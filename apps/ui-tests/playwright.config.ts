import { defineConfig, devices } from "@playwright/test";
import { defineBddConfig } from "playwright-bdd";
import { config, testEnvironment } from "../../config/environment";

const testDir = defineBddConfig({
  features: "./src/features/**/*.feature",
  steps: ["./src/steps/**/*.ts", "../api-tests/src/steps/**/*.ts"],
  outputDir: ".feature-gen/ui-tests",
  importTestFrom: "../api-tests/src/fixtures/hybrid.fixture.ts",
  disableWarnings: { importTestFrom: true },
});

export default defineConfig({
  testDir,
  fullyParallel: true,
  workers: process.env.CI ? 4 : 2,
  reporter: [["html", { open: "never" }]],
  use: {
    baseURL: config.BASE_URL,
    headless: process.env.CI ? false : true,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    navigationTimeout: 15_000,
    actionTimeout: 20_000,
    trace: "on",
    launchOptions: {
      slowMo: 500,
    },
  },
  expect: {
    timeout: 20_000,
  },
  projects: [
    {
      name: "ui-tests",
      testDir: testDir,
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
});

console.log(`Test Environment: ${testEnvironment}`);
console.log(`Base URL: ${config.BASE_URL}`);

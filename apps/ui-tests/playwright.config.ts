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

const configuredWorkers = process.env.WORKERS;

const workers = configuredWorkers
  ? Number(configuredWorkers)
  : process.env.CI
    ? 4
    : undefined;

if (workers !== undefined && (!Number.isInteger(workers) || workers < 1)) {
  throw new Error(
    `Invalid WORKERS value: "${configuredWorkers}". WORKERS must be a positive integer.`,
  );
}

const slowMo = process.env.CI ? 0 : 700;

export default defineConfig({
  testDir,

  fullyParallel: true,

  workers,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 1 : 0,

  reporter: [
    ["list"],
    [
      "html",
      {
        outputFolder: "playwright-report",
        open: "never",
      },
    ],
    [
      "junit",
      {
        outputFile: "reports/junit.xml",
      },
    ],
  ],

  use: {
    baseURL: config.BASE_URL,
    headless: process.env.HEADLESS !== "false",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "on-first-retry",
    navigationTimeout: 30_000,
    actionTimeout: 20_000,
    launchOptions: {
      slowMo,
    },
  },

  expect: {
    timeout: 20_000,
  },

  projects: [
    {
      name: "ui-tests",
      testDir,
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
});

console.log(`Test Environment: ${testEnvironment}`);
console.log(`Base URL: ${config.BASE_URL}`);
console.log(`Workers: ${workers ?? "Playwright default"}`);
console.log(`Slow Motion: ${slowMo}ms`);

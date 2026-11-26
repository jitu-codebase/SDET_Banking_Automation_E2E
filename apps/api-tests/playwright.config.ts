import { defineConfig } from "@playwright/test";
import { defineBddConfig } from "playwright-bdd";

import { config, testEnvironment } from "../../config/environment";

const testDir = defineBddConfig({
  features: "src/features/**/*.feature",
  steps: ["src/steps/**/*.ts"],
  outputDir: ".features-gen/api-tests",
  importTestFrom: "./src/fixtures/hybrid.fixture.ts",
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

  timeout: 30_000,

  expect: {
    timeout: 15_000,
  },

  use: {
    baseURL: config.BASE_URL,
    headless: process.env.HEADLESS !== "false",
    trace: "retain-on-failure",
  },
});

console.log(`Test Environment: ${testEnvironment}`);
console.log(`Base URL: ${config.BASE_URL}`);
console.log(`Workers: ${workers ?? "Playwright default"}`);

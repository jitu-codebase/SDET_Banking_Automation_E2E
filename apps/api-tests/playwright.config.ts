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

export default defineConfig({
  testDir,

  fullyParallel: true,

  reporter: "list",

  timeout: 30_000,

  expect: {
    timeout: 5_000,
  },

  use: {
    baseURL: config.BASE_URL,
  },
});

console.log(`Test Environment: ${testEnvironment}`);
console.log(`Base URL: ${config.BASE_URL}`);

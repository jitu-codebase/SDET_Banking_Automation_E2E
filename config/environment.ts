import { resolve } from "node:path";
import dotenv from "dotenv";
import { z } from "zod";

const environmentSchema = z.enum(["dev", "qa", "stage", "uat"]);

const selectedEnvironment = environmentSchema.safeParse(
  (process.env.TEST_ENV ?? "qa").toLowerCase(),
);

if (!selectedEnvironment.success) {
  throw new Error(
    `Invalid TEST_ENV. Supported environments: dev, qa, stage, uat.`,
  );
}

export const testEnvironment = selectedEnvironment.data;

const envFilePath = resolve(__dirname, "..", `.env.${testEnvironment}`);

const dotenvResult = dotenv.config({
  path: envFilePath,
});

if (dotenvResult.error) {
  throw new Error(`Unable to load environment file: .env.${testEnvironment}`);
}

const configSchema = z.object({
  BASE_URL: z.url(),
  DEMO_EMAIL: z.email(),
  DEMO_PASSWORD: z.string().min(1),
});

export const config = configSchema.parse(process.env);
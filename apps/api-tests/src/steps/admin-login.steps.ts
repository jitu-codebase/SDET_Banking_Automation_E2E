import { createBdd } from "playwright-bdd";
import { createAdminLoginPayload } from "@api-lib";
import { test, expect } from "../fixtures/hybrid.fixture";
import { logger } from "@core";

const { When, Then } = createBdd(test);

When(
  "admin logs in",
  async ({ adminLoginService, testDataContext, scenarioContext }) => {
    const payload = createAdminLoginPayload();
    const loginResponse = await adminLoginService.adminLogin(payload);
    logger.info(`Login email: ${loginResponse.data.user.email}`, "STEP");
    logger.info(`Login role:  ${loginResponse.data.user.role}`, "STEP");
    logger.info(`Token exists: ${Boolean(loginResponse.data.accessToken)}`, "STEP");
    testDataContext.set("adminAccessToken", loginResponse.data.accessToken);
    logger.debug(
      `Token stored: ${Boolean(testDataContext.get("adminAccessToken"))}`,
      "STEP",
    );
    scenarioContext.loginResult = loginResponse;
  },
);

Then("the login should be successful", async ({ scenarioContext }) => {
  const result = scenarioContext.loginResult;
  expect(result).toBeDefined();
  expect(result!.success).toBe(true);
  expect(result!.data.accessToken).toBeTruthy();
  expect(result!.data.user.email).toBeTruthy();
  logger.info("Admin logged in successfully", "STEP");
});

import { createBdd } from "playwright-bdd";
import { createAdminLoginPayload } from "@api-lib";
import { test, expect } from "../fixtures/hybrid.fixture";
const { When, Then } = createBdd(test);

When(
  "admin logs in",
  async ({ adminLoginService, testDataContext, scenarioContext }) => {
    const payload = createAdminLoginPayload();
    const loginResponse = await adminLoginService.adminLogin(payload);
    console.log("LOGIN EMAIL:", loginResponse.data.user.email);
    console.log("LOGIN ROLE:", loginResponse.data.user.role);
    console.log("TOKEN EXISTS:", Boolean(loginResponse.data.accessToken));
    testDataContext.set("accessToken", loginResponse.data.accessToken);
    console.log("TOKEN STORED:", Boolean(testDataContext.get("accessToken")));
    scenarioContext.loginResult = loginResponse;
  },
);

Then("the login should be successful", async ({ scenarioContext }) => {
  const result = scenarioContext.loginResult;
  expect(result).toBeDefined();
  expect(result!.success).toBe(true);
  expect(result!.data.accessToken).toBeTruthy();
  expect(result!.data.user.email).toBeTruthy();
  console.log("Admin logged in successfully");
});

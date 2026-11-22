import { createBdd } from "playwright-bdd";
import { test, expect } from "../fixtures/hybrid.fixture";
import type { getAllCustomerResponse } from "@api-lib";
import { logger } from "@core";

const { When, Then } = createBdd(test);

When(
  "admin retrieves customers",
  async ({ getAllCustomerService, testDataContext, scenarioContext }) => {
    const accessToken = testDataContext.get<string>("adminAccessToken");
    logger.debug(
      `Customer step — token exists: ${Boolean(accessToken)}`,
      "STEP",
    );
    if (!accessToken) {
      throw new Error("Admin access token not found in TestDataContext");
    }
    logger.info("Admin retrieving customers...", "STEP");
    const customerResponse = await getAllCustomerService.getAllCustomers(
      {
        offset: 20,
        limit: 10,
      },
      accessToken,
    );
    logger.info("Admin retrieved customers successfully", "STEP");
    testDataContext.set("Customer_Account_List", customerResponse);
    scenarioContext.customerResult = customerResponse;
  },
);

Then(
  "the customer list should be returned successfully",
  async ({ scenarioContext }) => {
    const result = scenarioContext.customerResult as
      | getAllCustomerResponse
      | undefined;

    expect(result).toBeDefined();
    expect(result!.success).toBe(true);
    expect(result!.data).toBeInstanceOf(Array);
    expect(result!.data.length).toBeGreaterThan(0);
    expect(result!.message).toContain("customers");
  },
);

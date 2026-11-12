import { createBdd } from "playwright-bdd";

import { test, expect } from "../fixtures/hybrid.fixture";
import type { getAllCustomerResponse } from "@api-lib";

const { When, Then } = createBdd(test);

When(
  "admin retrieves customers",
  async ({ getAllCustomerService, testDataContext, scenarioContext }) => {
    const accessToken = testDataContext.get<string>("accessToken");
    console.log("CUSTOMER STEP TOKEN EXISTS:", Boolean(accessToken));
    if (!accessToken) {
      throw new Error("Admin access token not found in TestDataContext");
    }
    console.log("Admin retreieving");
    const customerResponse = await getAllCustomerService.getAllCustomers(
      {
        offset: 20,
        limit: 10,
      },
      accessToken,
    );
    console.log("Admin retreived");
    scenarioContext.customerResult = customerResponse;
    console.log(
      `All Customers List: ${JSON.stringify(customerResponse, null, 2)}`,
    );
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

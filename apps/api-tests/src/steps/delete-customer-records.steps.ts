import { test } from "../../../api-tests/src/fixtures/hybrid.fixture";
import { createBdd } from "playwright-bdd";
export const { Given, When } = createBdd(test);
import { HELPER } from "@core";
import { getAllCustomerResponse } from "@api-lib";

When(
  "admin sends delete request for a user",
  async ({
    testDataContext,
    deleteCustomerRecordService,
  }) => {
    const adminAccessToken = testDataContext.get<string>("adminAccessToken");
    const response = testDataContext.get("Customer_Account_List") as getAllCustomerResponse;
    await HELPER.deleteAllCustomersExceptProtectedUsers(
      response,
      deleteCustomerRecordService,
      adminAccessToken,
    );
  },
);

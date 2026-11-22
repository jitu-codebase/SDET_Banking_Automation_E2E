import { test } from "../../../api-tests/src/fixtures/hybrid.fixture";
import { createBdd } from "playwright-bdd";
import { DynamicDataHelper, Constant } from "@core";
import { config } from "@config/environment";
import { AccountType } from "@ui-lib";

export const { Given, When } = createBdd(test);

When(
  "I do the login using api data context in UI",
  async ({ testDataContext, loginPage }) => {
    await loginPage.login(
      testDataContext.get<string>("emailId"),
      config.DEMO_PASSWORD,
    );
  },
);

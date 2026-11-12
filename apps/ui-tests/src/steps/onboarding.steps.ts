import { test } from "../../../api-tests/src/fixtures/hybrid.fixture";
import { createBdd } from "playwright-bdd";
import { DynamicDataHelper, Constant } from "@core";
import { config } from "@config/environment";
import { AccountType } from "@ui-lib";

export const { Given, When } = createBdd(test);

Given("I launch the url", async ({ page }) => {
  await page.goto(".");
});

When("I click on open account button", async ({ landingPage }) => {
  await landingPage.clickOpenAccountButton();
});

When("I fill the email address", async ({ registerPage, testDataContext }) => {
  testDataContext.set("emailId", DynamicDataHelper.generateRandomEmailId());
  await registerPage.enterEmailAddress(testDataContext.get("emailId")!);
  await registerPage.clickContinueToOnboardingButton();
});

When(
  "I fill the personal details",
  async ({ personalDetailPage, testDataContext }) => {
    const firstName = DynamicDataHelper.generateRandomFirstName();
    const lastName = DynamicDataHelper.generateRandomLastName();
    const dob = DynamicDataHelper.generateRandomDOB();
    const address = DynamicDataHelper.generateRandomAddress();
    await personalDetailPage.enterPersonalDetails(
      firstName,
      lastName,
      dob,
      address,
    );
    testDataContext.set("firstName", firstName);
    testDataContext.set("lastName", lastName);
    testDataContext.set("dob", dob);
    testDataContext.set("address", address);
  },
);

When(
  "I fill the contact details",
  async ({ contactDetailPage, testDataContext }) => {
    const emailId = testDataContext.get<string>("emailId");
    await contactDetailPage.enterContactDetails(emailId, Constant.MOB);
  },
);

When(
  "I fill account details for accountType {string}",
  async ({ accountDetailPage, testDataContext }, accountType: string) => {
    const username = DynamicDataHelper.generateRandomUsername();
    const password = config.DEMO_PASSWORD;
    testDataContext.set("username", username);
    await accountDetailPage.createAccountSetup(
      username,
      password,
      accountType as AccountType,
    );
  },
);

When(
  "I fill identity details",
  async ({ identityDetailPage, testDataContext }) => {
    const panCardNum = DynamicDataHelper.generateRandomPancardNumber();
    const aadharCardNum = DynamicDataHelper.generateRandomAadharNumber();
    await identityDetailPage.enterIdentityDetails(panCardNum, aadharCardNum);
    testDataContext.set("panCardNum", panCardNum);
    testDataContext.set("aadharCardNum", aadharCardNum);
  },
);

When(
  "I select source of income as {string}",
  async ({ financialDetailPage }, sourceOfIncome: string) => {
    await financialDetailPage.selectSourceOfIncome(sourceOfIncome);
  },
);

When("I accept declaration", async ({ declarationDetailPage }) => {
  await declarationDetailPage.acceptDeclaration();
});

When(
  "I verify account is created successfully",
  async ({ onboardingSuccessPage, testDataContext }) => {
    await onboardingSuccessPage.verifySuccessMessageIsVisible();
    await onboardingSuccessPage.verifyIfAccountDetailsAreVisible();
    testDataContext.set(
      "customerId",
      await onboardingSuccessPage.getCustomerId(),
    );
    testDataContext.set(
      "accountNumber",
      await onboardingSuccessPage.getAccountNumber(),
    );
    testDataContext.set("ifscCode", await onboardingSuccessPage.getIfscCode());
  },
);

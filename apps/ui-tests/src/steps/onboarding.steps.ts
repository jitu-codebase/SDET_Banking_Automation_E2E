import { test } from "../../../api-tests/src/fixtures/hybrid.fixture";
import { createBdd } from "playwright-bdd";
import { DynamicDataHelper, Constant, logger } from "@core";
import { config } from "@config/environment";
import { AccountType } from "@ui-lib";

export const { Given, When } = createBdd(test);

Given("I launch the url", async ({ page }) => {
  logger.info("Launching application URL", "STEP");
  await page.goto(".");
});

When("I click on open account button", async ({ landingPage }) => {
  logger.info("Clicking open account button", "STEP");
  await landingPage.clickOpenAccountButton();
});

When("I fill the email address", async ({ registerPage, testDataContext }) => {
  const emailId = DynamicDataHelper.generateRandomEmailId();
  testDataContext.set("emailId", emailId);
  logger.info(`Generated email: ${emailId}`, "STEP");
  await registerPage.enterEmailAddress(testDataContext.get("emailId")!);
  await registerPage.clickContinueToOnboardingButton();
});

When(
  "I fill the personal details",
  async ({ personalDetailPage, testDataContext }) => {
    logger.info("Filling personal details", "STEP");
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
    logger.debug(
      `Stored personal details — firstName: ${firstName}, lastName: ${lastName}`,
      "STEP",
    );
  },
);

When(
  "I fill the contact details",
  async ({ contactDetailPage, testDataContext }) => {
    logger.info("Filling contact details", "STEP");
    const emailId = testDataContext.get<string>("emailId");
    await contactDetailPage.enterContactDetails(emailId, Constant.MOB);
  },
);

When(
  "I fill account details for accountType {string}",
  async ({ accountDetailPage, testDataContext }, accountType: string) => {
    logger.info(`Setting up account — type: ${accountType}`, "STEP");
    const username = DynamicDataHelper.generateRandomUsername();
    const password = config.DEMO_PASSWORD;
    testDataContext.set("username", username);
    await accountDetailPage.createAccountSetup(
      username,
      password,
      accountType as AccountType,
    );
    logger.debug(`Stored username: ${username}`, "STEP");
  },
);

When(
  "I fill identity details",
  async ({ identityDetailPage, testDataContext }) => {
    logger.info("Filling identity details", "STEP");
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
    logger.info(`Selecting source of income: ${sourceOfIncome}`, "STEP");
    await financialDetailPage.selectSourceOfIncome(sourceOfIncome);
  },
);

When("I accept declaration", async ({ declarationDetailPage }) => {
  logger.info("Accepting declaration", "STEP");
  await declarationDetailPage.acceptDeclaration();
});

When(
  "I verify account is created successfully",
  async ({ onboardingSuccessPage, testDataContext }) => {
    logger.info("Verifying account creation", "STEP");
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
    logger.info(
      `Account created — customerId: ${testDataContext.get("customerId")}`,
      "STEP",
    );
  },
);

import { test, expect } from "../../../api-tests/src/fixtures/hybrid.fixture";
import { createBdd } from "playwright-bdd";
import { config } from "@config/environment";
import { logger } from "@core";

export const { Given, When, Then } = createBdd(test);

When(
  "I do the login using api data context in UI",
  async ({ testDataContext, loginPage }) => {
    await loginPage.login(
      testDataContext.get<string>("emailId"),
      config.DEMO_PASSWORD,
    );
  },
);

When(
  "I navigate to {string} page from nav_menu",
  async ({ dashboardPage }, nav_page: string) => {
    logger.info(`Navigating to page: ${nav_page}`);
    const pageKey = nav_page.toLowerCase();
    if (pageKey.includes("automation")) {
      logger.info("Clicking automation lab link");
      await dashboardPage.clickAutomationLabLink();
      return;
    }
    throw new Error(`Invalid navigation page: ${nav_page}`);
  },
);

Then("I land on {string} page", async ({ page }, page_name: string) => {
  const baseURL = config.BASE_URL;
  const expected_Page_URL = `${baseURL}${page_name.toLowerCase()}`;
  await expect(page).toHaveURL(expected_Page_URL);
  logger.info(`I landed on ${page_name} page successfully`);
});

Then(
  "I select {string} from fruits drop down",
  async ({ automationPracticePage }, fruits: string) => {
    await automationPracticePage.selectFruit(fruits);
    await automationPracticePage.verifySelectedFruit(fruits);
    logger.info(`${fruits} is selected and verified successfully`);
  },
);

Then(
  "I select {string} radio button",
  async ({ automationPracticePage }, radioButton: string) => {
    await automationPracticePage.selectRadioButton(radioButton);
    logger.info(`${radioButton} is selected successfully`);
  },
);

Then(
  "I select {string} check box",
  async ({ automationPracticePage }, checkBox: string) => {
    await automationPracticePage.selectCheckBox(checkBox);
    logger.info(`${checkBox} is selected successfully`);
  },
);

Then("I upload file", async ({ automationPracticePage }) => {
  await automationPracticePage.uploadDoc();
  logger.info("File uploaded successfully");
});

Then(
  "I fill full name {string} and select role {string} in iframe",
  async ({ automationPracticePage }, fullName: string, role: string) => {
    await automationPracticePage.fillApplicationInIframe(fullName, role);
    logger.info("Full name and role filled successfully");
  },
);

Then(
  "I validate javascript {string} alerts",
  async ({ automationPracticePage }, alertType: string) => {
    if (alertType === "normal") {
      await automationPracticePage.handleNormalAlert();
    }
    if (alertType === "confirm") {
      await automationPracticePage.handleConfirmAlert();
    }
    if (alertType === "prompt") {
      await automationPracticePage.handlePromptAlert();
    }
  },
);

Then("I validate new tab", async ({ automationPracticePage }) => {
  await automationPracticePage.handleNewTab();
  logger.info("New tab handled successfully");
});

Then("I validate pop up window", async ({ automationPracticePage }) => {
  await automationPracticePage.handlePopUpWindow();
  logger.info("Pop up window handled successfully");
});

Then(
  "I fill form in new tab and then in parent tab",
  async ({ automationPracticePage, dashboardPage, testDataContext }) => {
    await automationPracticePage.fillFormInNewTab(
      testDataContext.get<string>("emailId"),
      config.DEMO_PASSWORD,
    );
  },
);

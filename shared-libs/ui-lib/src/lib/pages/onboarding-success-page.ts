import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./base-page";

export class OnboardingSuccessPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get customerId(): Locator {
    return this.page.locator("#customer-id");
  }
  get accountNumber(): Locator {
    return this.page.locator("#account-number");
  }
  get successMessage(): Locator {
    return this.page.getByRole("heading", {
      name: "Account Created!",
      level: 1,
    });
  }
  get ifscCode(): Locator {
    return this.page.locator("#ifsc-code");
  }
  get goToLoginTextLink(): Locator {
    return this.page.getByRole("link", { name: "Go to Login →" });
  }
  get backToHomeTextLink(): Locator {
    return this.page.getByRole("link", { name: "Back to Home" });
  }

  async getCustomerId(): Promise<string> {
    return this.action("getCustomerId", async () => {
      return await this.customerId.innerText();
    });
  }

  async getAccountNumber(): Promise<string> {
    return this.action("getAccountNumber", async () => {
      return await this.accountNumber.innerText();
    });
  }

  async getIfscCode(): Promise<string> {
    return this.action("getIfscCode", async () => {
      return await this.ifscCode.innerText();
    });
  }

  async verifySuccessMessageIsVisible(): Promise<void> {
    await this.action("verifySuccessMessageIsVisible", async () => {
      await expect(this.successMessage).toBeVisible();
    });
  }

  async verifyIfAccountDetailsAreVisible(): Promise<void> {
    await this.action("verifyIfAccountDetailsAreVisible", async () => {
      await expect(this.customerId).toBeVisible();
      await expect(this.accountNumber).toBeVisible();
      await expect(this.ifscCode).toBeVisible();
    });
  }

  async getCustomerAccountDetailsFromUI(): Promise<{
    customerId: string;
    accountNumber: string;
    ifscCode: string;
  }> {
    return this.action("getCustomerAccountDetailsFromUI", async () => {
      const customerId = await this.getCustomerId();
      const accountNumber = await this.getAccountNumber();
      const ifscCode = await this.getIfscCode();
      return { customerId, accountNumber, ifscCode };
    });
  }

  async navigateToLoginPage(): Promise<void> {
    await this.action("navigateToLoginPage", async () => {
      await this.goToLoginTextLink.click();
    });
  }

  async navigateToHomePage(): Promise<void> {
    await this.action("navigateToHomePage", async () => {
      await this.backToHomeTextLink.click();
    });
  }
}

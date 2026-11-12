import { Locator, Page, expect } from "@playwright/test";

export class OnboardingSuccessPage {
  constructor(private readonly page: Page) {}

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
    return await this.customerId.innerText();
  }
  async getAccountNumber(): Promise<string> {
    return await this.accountNumber.innerText();
  }
  async getIfscCode(): Promise<string> {
    return await this.ifscCode.innerText();
  }

  async verifySuccessMessageIsVisible(): Promise<void> {
    await expect(this.successMessage).toBeVisible();
  }

  async verifyIfAccountDetailsAreVisible(): Promise<void> {
    await expect(this.customerId).toBeVisible();
    await expect(this.accountNumber).toBeVisible();
    await expect(this.ifscCode).toBeVisible();
  }

  async getCustomerAccountDetailsFromUI(): Promise<{
    customerId: string;
    accountNumber: string;
    ifscCode: string;
  }> {
    const customerId = await this.getCustomerId();
    const accountNumber = await this.getAccountNumber();
    const ifscCode = await this.getIfscCode();
    return {
      customerId,
      accountNumber,
      ifscCode,
    };
  }

  async navigateToLoginPage(): Promise<void> {
    await this.goToLoginTextLink.click();
  }
  async navigateToHomePage(): Promise<void> {
    await this.backToHomeTextLink.click();
  }
}

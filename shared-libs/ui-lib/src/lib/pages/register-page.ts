import { Locator, Page } from "@playwright/test";

export class RegisterPage {
  constructor(private readonly page: Page) {}

  get emailAddressInputBox(): Locator {
    return this.page.getByRole("textbox", {
      name: "Email Address",
      exact: true,
    });
  }
  get continueToOnboardingButton(): Locator {
    return this.page.getByRole("button", { name: "Continue to Onboarding →" });
  }

  async enterEmailAddress(emailId: string): Promise<void> {
    await this.emailAddressInputBox.fill(emailId);
  }

  async clickContinueToOnboardingButton(): Promise<void> {
    await this.continueToOnboardingButton.click();
  }
}

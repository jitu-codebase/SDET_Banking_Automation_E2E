import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";

export class RegisterPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

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
    await this.action("enterEmailAddress", async () => {
      await this.emailAddressInputBox.fill(emailId);
    });
  }

  async clickContinueToOnboardingButton(): Promise<void> {
    await this.action("clickContinueToOnboardingButton", async () => {
      await this.continueToOnboardingButton.click();
    });
  }
}

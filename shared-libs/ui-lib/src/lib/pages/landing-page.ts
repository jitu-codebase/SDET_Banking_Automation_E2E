import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";

export class LandingPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get signInButton(): Locator {
    return this.page.getByRole("link", { name: "Sign In" });
  }
  get openAccountButton(): Locator {
    return this.page.getByRole("link", { name: "Open Account" });
  }

  async clickSignInButton(): Promise<void> {
    await this.action("clickSignInButton", async () => {
      await this.signInButton.first().click();
    });
  }

  async clickOpenAccountButton(): Promise<void> {
    await this.action("clickOpenAccountButton", async () => {
      await this.openAccountButton.first().click();
    });
  }
}

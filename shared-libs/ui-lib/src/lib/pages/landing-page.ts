import { Locator, Page } from "@playwright/test";

export class LandingPage {
  constructor(private readonly page: Page) {}

  get signInButton(): Locator {
    return this.page.getByRole("link", { name: "Sign In" });
  }
  get openAccountButton(): Locator {
    return this.page.getByRole("link", { name: "Open Account" });
  }

  async clickSignInButton(): Promise<void> {
    await this.signInButton.first().click();
  }

  async clickOpenAccountButton(): Promise<void> {
    await this.openAccountButton.first().click();
  }
}

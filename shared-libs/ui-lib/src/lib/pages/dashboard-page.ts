import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";

export class DashboardPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get automationLabLink(): Locator {
    return this.page.getByRole("link", { name: " Automation Lab" }).first();
  }

  async clickAutomationLabLink(): Promise<void> {
    await this.action("clickAutomationLabLink", async () => {
      await this.automationLabLink.click();
    });
  }
}

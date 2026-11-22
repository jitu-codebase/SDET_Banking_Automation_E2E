import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";

export class ContactDetailPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get emailAddressInputBox(): Locator {
    return this.page.getByRole("textbox", { name: "Email Address" });
  }
  get mobileNumberInputBox(): Locator {
    return this.page.getByRole("textbox", { name: "Mobile Number" });
  }
  get nextButton(): Locator {
    return this.page.getByRole("button", { name: "Next: Account Setup →" });
  }

  async enterContactDetails(emailId: string, mob: string): Promise<void> {
    await this.action("enterContactDetails", async () => {
      await this.emailAddressInputBox.fill(emailId);
      await this.mobileNumberInputBox.fill(mob);
      await this.nextButton.click();
    });
  }
}

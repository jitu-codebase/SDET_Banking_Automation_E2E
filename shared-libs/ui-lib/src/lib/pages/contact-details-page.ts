import { Locator, Page } from "@playwright/test";

export class ContactDetailPage {
  constructor(private readonly page: Page) {}
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
    await this.emailAddressInputBox.fill(emailId);
    await this.mobileNumberInputBox.fill(mob);
    await this.nextButton.click();
  }
}

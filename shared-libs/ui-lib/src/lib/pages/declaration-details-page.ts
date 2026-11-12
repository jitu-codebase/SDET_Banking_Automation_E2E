import { Locator, Page, expect } from "@playwright/test";

export class DeclarationDetailPage {
  constructor(private readonly page: Page) {}
  get declarationCheckbox(): Locator {
    return this.page.locator("label").filter({
      has: this.page.locator("input#declarationAccepted"),
    });
  }
  get submitApplicationButton(): Locator {
    return this.page.getByRole("button", { name: "Submit & Open Account 🎉" });
  }

  async acceptDeclaration(): Promise<void> {
    await this.declarationCheckbox.click();
    await expect(this.page.locator("input#declarationAccepted")).toBeChecked();
    await this.submitApplicationButton.click();
  }
}

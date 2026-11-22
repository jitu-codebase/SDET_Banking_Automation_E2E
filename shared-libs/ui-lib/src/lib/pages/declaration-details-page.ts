import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./base-page";

export class DeclarationDetailPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get declarationCheckbox(): Locator {
    return this.page.locator("label").filter({
      has: this.page.locator("input#declarationAccepted"),
    });
  }
  get submitApplicationButton(): Locator {
    return this.page.getByRole("button", { name: "Submit & Open Account 🎉" });
  }

  async acceptDeclaration(): Promise<void> {
    await this.action("acceptDeclaration", async () => {
      await this.declarationCheckbox.click();
      await expect(
        this.page.locator("input#declarationAccepted"),
      ).toBeChecked();
      await this.submitApplicationButton.click();
    });
  }
}

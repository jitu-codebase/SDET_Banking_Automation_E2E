import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./base-page";

export class FinancialDetailPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get salariedSourceOfIncome(): Locator {
    return this.page.getByRole("radio", { name: "Salaried", exact: true });
  }

  get nextBtn(): Locator {
    return this.page.getByRole("button", { name: "Next: Declaration →" });
  }

  async selectSourceOfIncome(sourceOfIncome: string): Promise<void> {
    await this.action("selectSourceOfIncome", async () => {
      // 1. Locate the hidden radio button
      const sourceRadio = this.page.getByRole("radio", {
        name: sourceOfIncome,
        exact: true,
      });

      // 2. Locate the <label> that wraps it
      const radioLabel = this.page.locator("label").filter({
        has: this.page.locator("span", {
          hasText: new RegExp(`^${sourceOfIncome}$`),
        }),
      });

      // 3. Click the label instead of the hidden input
      await radioLabel.click();

      // 4. Verify the hidden input is now checked
      await expect(sourceRadio).toBeChecked();

      // 5. Proceed to the next step
      await this.nextBtn.click();
    });
  }
}

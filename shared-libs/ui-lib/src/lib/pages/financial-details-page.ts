import { Locator, Page, expect } from "@playwright/test";

export class FinancialDetailPage {
  constructor(private readonly page: Page) {}

  // Removed the 'checked: false' from your getter so it acts as a standard locator
  get salariedSourceOfIncome(): Locator {
    return this.page.getByRole("radio", { name: "Salaried", exact: true });
  }

  get nextBtn(): Locator {
    return this.page.getByRole("button", { name: "Next: Declaration →" });
  }

  async selectSourceOfIncome(sourceOfIncome: string): Promise<void> {
    // 1. Locate the hidden radio button
    const sourceRadio = this.page.getByRole("radio", {
      name: sourceOfIncome,
      exact: true,
    });

    // 2. Locate the <label> that wraps it.
    // We use a precise filter to find the label containing the exact text string.
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
  }
}

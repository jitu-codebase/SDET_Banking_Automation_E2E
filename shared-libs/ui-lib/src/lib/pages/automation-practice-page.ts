import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./base-page";

export class AutomationPracticePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get fruitDropDown(): Locator {
    return this.page.getByRole("combobox", { name: "Choose a fruit" });
  }
  get fruitSelected(): Locator {
    return this.page.locator("#fruit-selected");
  }

  async selectFruit(fruit: string): Promise<void> {
    await this.action("selectFruit", async () => {
      await this.fruitDropDown.selectOption({ value: fruit.toLowerCase() });
    });
  }

  async verifySelectedFruit(actualFruit: string): Promise<void> {
    await this.action("verifySelectedFruit", async () => {
      expect(await this.fruitSelected.textContent()).toContain(
        actualFruit.toLowerCase(),
      );
    });
  }
}

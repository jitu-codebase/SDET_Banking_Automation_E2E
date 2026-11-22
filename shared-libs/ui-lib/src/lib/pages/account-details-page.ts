import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";

export type AccountType = "Savings Account" | "Current Account";

export class AccountDetailPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get eusernameInputBox(): Locator {
    return this.page.getByRole("textbox", { name: "Username" });
  }
  get passwordInputBox(): Locator {
    return this.page.getByRole("textbox", { name: "Password" });
  }
  get confirmPasswordInputBox(): Locator {
    return this.page.getByRole("textbox", { name: "Confirm Password" });
  }
  get selectAccountTypeDropDown(): Locator {
    return this.page.getByRole("combobox", { name: "Account Type" });
  }
  get nextButton(): Locator {
    return this.page.getByRole("button", { name: "Next: Identity →" });
  }

  async createAccountSetup(
    username: string,
    password: string,
    accountType: AccountType,
  ): Promise<void> {
    await this.action("createAccountSetup", async () => {
      await this.eusernameInputBox.fill(username);
      await this.passwordInputBox.first().fill(password);
      await this.confirmPasswordInputBox.first().fill(password);
      await this.selectAccountTypeDropDown.selectOption({ label: accountType });
      await this.nextButton.click();
    });
  }
}

import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";

export class PersonalDetailPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get firstNameInputBox(): Locator {
    return this.page.getByRole("textbox", { name: "First Name" });
  }
  get lastNameInputBox(): Locator {
    return this.page.getByRole("textbox", { name: "Last Name" });
  }
  get dateOfBirthInputBox(): Locator {
    return this.page.getByRole("textbox", { name: "Date of Birth" });
  }
  get addressInputBox(): Locator {
    return this.page.getByRole("textbox", { name: "Residential Address" });
  }
  get nextButton(): Locator {
    return this.page.getByRole("button", { name: "Next: Contact Details →" });
  }

  async enterPersonalDetails(
    firstName: string,
    lastName: string,
    dob: string,
    address: string,
  ): Promise<void> {
    await this.action("enterPersonalDetails", async () => {
      await this.firstNameInputBox.fill(firstName);
      await this.lastNameInputBox.fill(lastName);
      await this.dateOfBirthInputBox.fill(dob);
      await this.addressInputBox.fill(address);
      await this.nextButton.click();
    });
  }
}

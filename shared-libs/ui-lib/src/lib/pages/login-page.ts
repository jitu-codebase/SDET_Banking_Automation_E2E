import { Locator, Page, expect } from "@playwright/test";

export class LoginPage {
  constructor(private readonly page: Page) {}

  get sign_in_link(): Locator {
    return this.page.getByRole("link", { name: "Sign In" }).first();
  }
  get email_id_text_box(): Locator {
    return this.page.getByRole("textbox", { name: "Email Address" });
  }
  get password_text_box(): Locator {
    return this.page.getByRole("textbox", { name: "Password" });
  }
  get sign_in_button(): Locator {
    return this.page.getByRole("button", { name: "Sign In" }).first();
  }

  async login(email: string, password: string): Promise<void> {
    await this.sign_in_link.click();
    await this.email_id_text_box.fill(email);
    await this.password_text_box.fill(password);
    await this.sign_in_button.click();
  }
}

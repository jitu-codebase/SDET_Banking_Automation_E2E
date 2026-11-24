import { Locator, FrameLocator, Page, expect } from "@playwright/test";
import { BasePage } from "./base-page";
import { UploadFileComponents } from "../components/upload-file.components";
import * as path from "node:path";
import { formData } from "@core";

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
  get iframeApplication(): FrameLocator {
    return this.page.frameLocator("#embedded-iframe");
  }

  get iframeFullName(): Locator {
    return this.iframeApplication.getByRole("textbox", { name: "Full Name" });
  }

  get roleSelectDropDown(): Locator {
    return this.iframeApplication.getByRole("combobox", {
      name: "Select Role",
    });
  }

  get newWindowLink(): Locator {
    return this.page.getByRole("link", { name: "🪟 Open New Window" });
  }

  get popWindowButton(): Locator {
    return this.page.getByRole("button", { name: "📦 Open Popup Window" });
  }

  radioButton(radio: string): Locator {
    return this.page.getByRole("radio", {
      name: radio,
      exact: true,
    });
  }

  get textInputBox(): Locator {
    return this.page.getByRole("textbox", { name: "Text Input", exact: true });
  }

  get emailInputBox(): Locator {
    return this.page.getByRole("textbox", { name: "Email Input", exact: true });
  }

  get passwordInputBox(): Locator {
    return this.page.getByRole("textbox", {
      name: "Password Input",
      exact: true,
    });
  }

  get numberInputBox(): Locator {
    return this.page.getByRole("spinbutton", { name: "Number Input" });
  }

  get textareaInputBox(): Locator {
    return this.page.getByRole("textbox", { name: "Textarea", exact: true });
  }

  get normalAlertButton(): Locator {
    return this.page.getByRole("button", { name: "🚨 Trigger Alert" });
  }
  get confirmAlertButton(): Locator {
    return this.page.getByRole("button", { name: "❓ Trigger Confirm" });
  }
  get promptAlertButton(): Locator {
    return this.page.getByRole("button", { name: "✏️ Trigger Prompt" });
  }

  get uploadFileAreaBox(): Locator {
    return this.page.locator("#file-upload-zone");
  }

  get submitFormButton(): Locator {
    return this.page.getByRole("button", { name: "Submit Form" });
  }

  checkBoxes(checkBox: string): Locator {
    return this.page.getByRole("checkbox", { name: checkBox, exact: true });
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

  async selectRadioButton(radioButton: string): Promise<void> {
    const radio = this.radioButton(radioButton);
    await radio.check();
    await expect(radio).toBeChecked();
  }

  async selectCheckBox(checkBox: string): Promise<void> {
    const box = this.checkBoxes(checkBox.toLowerCase());
    await box.check();
    await expect(box).toBeChecked();
  }

  async uploadDoc(): Promise<void> {
    const filePath = path.resolve(process.cwd(), "../../CodingImp.pdf");
    await new UploadFileComponents(this.page).uploadFile(
      filePath,
      this.uploadFileAreaBox,
    );
  }

  async fillApplicationInIframe(fullName: string, role: string): Promise<void> {
    await this.action("fillApplicationInIframe", async () => {
      await this.iframeFullName.fill(fullName);
      await this.roleSelectDropDown.selectOption({ value: role });
    });
  }

  async handleNormalAlert(): Promise<void> {
    await this.action("handleNormalAlert", async () => {
      this.page.once("dialog", async (dialog) => {
        expect(dialog.message()).toContain("This is a browser alert!");
        await dialog.accept();
      });
      await this.normalAlertButton.highlight();
      await this.normalAlertButton.click();
    });
  }

  async handlePromptAlert(): Promise<void> {
    await this.action("handlePromptAlert", async () => {
      this.page.once("dialog", async (dialog) => {
        await dialog.accept("Jitendra");
      });
      await this.promptAlertButton.highlight();
      await this.promptAlertButton.click();
    });
  }

  async handleConfirmAlert(): Promise<void> {
    await this.action("handleConfirmAlert", async () => {
      this.page.once("dialog", async (dialog) => {
        await dialog.accept();
      });
      await this.confirmAlertButton.highlight();
      await this.confirmAlertButton.click();
    });
  }

  // ───────────────────────── WINDOWS ─────────────────────────

  async handleNewTab(): Promise<Page> {
    // Don't rely on `action` returning the value — capture the page via closure.
    let newPage!: Page;
    await this.action("handleNewTab", async () => {
      [newPage] = await Promise.all([
        this.page.context().waitForEvent("page"),
        this.newWindowLink.click(),
      ]);
      await newPage.waitForLoadState();
    });
    console.log("New tab:", await newPage.title(), newPage.url());
    return newPage;
  }

  async handlePopUpWindow(): Promise<void> {
    await this.action("handlePopWindow", async () => {
      const [popup] = await Promise.all([
        this.page.waitForEvent("popup"),
        this.popWindowButton.click(),
      ]);
      await popup.waitForLoadState();
      console.log("Popup:", await popup.title(), popup.url());
      await popup.close();
    });
  }

  // Page-scoped so it actually fills the page you pass in.
  private fillFormOn(
    target: Page,
    email: string,
    password: string,
  ): Promise<void> {
    const data = formData(email, password);
    return this.action("fillForm", async () => {
      await target
        .getByRole("textbox", { name: "Text Input", exact: true })
        .fill(data.textInput);
      await target
        .getByRole("textbox", { name: "Email Input", exact: true })
        .fill(data.email);
      await target
        .getByRole("textbox", { name: "Password Input", exact: true })
        .fill(password);
      await target
        .getByRole("spinbutton", { name: "Number Input" })
        .fill(data.numberInput.toString());
      await target
        .getByRole("textbox", { name: "Textarea", exact: true })
        .fill(data.textareaInput);
      await target.getByRole("button", { name: "Submit Form" }).click();
    });
  }

  async fillForm(page: Page, email: string, password: string): Promise<void> {
    await this.fillFormOn(page, email, password);
  }

  async fillFormInNewTab(email: string, password: string): Promise<void> {
    const parentPage = this.page;
    const childPage = await this.handleNewTab();
    await childPage.waitForLoadState();
    await childPage
      .getByRole("link", { name: " Automation Lab" })
      .first()
      .click();
    await this.fillFormOn(childPage, email, password);
    await parentPage.bringToFront();
    await this.fillFormOn(parentPage, email, password);
  }
}

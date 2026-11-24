import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "@ui-lib/pages/base-page";
import { FileUploadError } from "../errors/ui-errors";

export class UploadFileComponents extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async uploadFile(filePath: string, locator: Locator): Promise<void> {
    try {
      const [fileChooser] = await Promise.all([
        this.page.waitForEvent("filechooser"),
        locator.click(),
      ]);
      await fileChooser.setFiles(filePath);
    } catch (error) {
      throw new FileUploadError(
        this.pageName,
        this.page.url(),
        filePath,
        error,
      );
    }
  }
}

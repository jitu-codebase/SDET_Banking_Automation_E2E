import { Locator, Page } from "@playwright/test";
import path from "node:path";

export class IdentityDetailPage {
  constructor(private readonly page: Page) {}

  get panCardNumInputBox(): Locator {
    return this.page.getByRole("textbox", { name: "PAN Card Number" });
  }
  get aadharCardNumInputBox(): Locator {
    return this.page.getByRole("textbox", { name: "Aadhaar Number" });
  }
  get uploadFileAreaBox(): Locator {
    return this.page.getByText("Click to upload Aadhaar", { exact: true });
  }
  get nextBtn(): Locator {
    return this.page.getByRole("button", { name: "Next: Financial →" });
  }

  async enterIdentityDetails(
    panCardNum: string,
    aadharCardNum: string,
  ): Promise<void> {
    await this.panCardNumInputBox.fill(panCardNum);
    await this.aadharCardNumInputBox.fill(aadharCardNum);
    await this.uploadDoc();
    await this.nextBtn.click();
  }

  async uploadDoc(): Promise<void> {
    try {
      const filePath = path.resolve(process.cwd(), "../../CodingImp.pdf");
      const [filechooser] = await Promise.all([
        this.page.waitForEvent("filechooser"),
        this.uploadFileAreaBox.click(),
      ]);
      await filechooser.setFiles(filePath);
    } catch (error) {
      throw new Error(`Error while uploading document: ${error}`);
    }
  }
}

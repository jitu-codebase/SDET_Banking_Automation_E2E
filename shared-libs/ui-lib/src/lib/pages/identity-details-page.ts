import { Locator, Page } from "@playwright/test";
import path from "node:path";
import { BasePage } from "./base-page";
import { UploadFileComponents } from "../components/upload-file.components";

export class IdentityDetailPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

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
    await this.action("enterIdentityDetails", async () => {
      await this.panCardNumInputBox.fill(panCardNum);
      await this.aadharCardNumInputBox.fill(aadharCardNum);
      await this.uploadDoc();
      await this.nextBtn.click();
    });
  }

  async uploadDoc(): Promise<void> {
    const filePath = path.resolve(process.cwd(), "../../CodingImp.pdf");
    await new UploadFileComponents(this.page).uploadFile(
      filePath,
      this.uploadFileAreaBox,
    );
  }
}

import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "@ui-lib/pages/base-page";

export class JsalertComponents extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async handleJsAlert(
    locator: Locator,
    action: string,
    options: { prompt?: string; confirm?: string } = {},
  ): Promise<void> {
    await this.action("handleAlerts", async () => {
      // Set up the dialog wait BEFORE clicking, so we don't race the event.
      const dialogPromise = this.page.waitForEvent("dialog");
      await locator.click();
      const dialog = await dialogPromise;

      switch (action.toLowerCase()) {
        case "normal": {
          // Accept (acknowledge) the alert.
          await dialog.accept();
          break;
        }
        case "confirm": {
          // "confirm" option decides accept vs dismiss; default accept.
          const choice = (options.confirm ?? "accept").toLowerCase();
          if (choice === "dismiss") {
            await dialog.dismiss();
          } else {
            await dialog.accept();
          }
          break;
        }
        case "prompt": {
          // Type text into the prompt (default empty) and accept.
          await dialog.accept(options.prompt ?? "");
          break;
        }
        default:
          throw new Error(`Unsupported alert action: "${action}"`);
      }
    });
  }
}

import { Page } from "@playwright/test";
import { logger } from "@core";
import { UIActionError } from "../errors/ui-errors";

/**
 * Abstract base for every Page Object.
 *
 * Provides:
 * - `action(name, fn)` — wraps any async interaction with logging, screenshot
 *   capture on failure, and error enrichment.
 * - `waitForPageReady()` — opt-in helper subclasses can call before interactions.
 *
 * All subclass public methods should delegate to `this.action()` so failures
 * are automatically logged with page URL, title, and a point-of-failure
 * screenshot — without changing the public API consumers depend on.
 */
export abstract class BasePage {
  /** Human-readable class name used in log lines and error messages. */
  protected readonly pageName: string;

  constructor(protected readonly page: Page) {
    this.pageName = this.constructor.name;
  }

  /**
   * Wraps a UI interaction with structured logging and error enrichment.
   *
   * On success: logs entry (INFO) and exit (DEBUG).
   * On failure: captures a screenshot, logs the error with page context, and
   *             re-throws a `UIActionError` that preserves the original cause.
   *
   * If the caught error is already a `UIActionError` it is re-thrown as-is to
   * avoid double-wrapping when actions call other actions internally.
   */
  protected async action<T>(
    actionName: string,
    fn: () => Promise<T>,
  ): Promise<T> {
    logger.info(`▶ ${actionName}`, this.pageName);

    try {
      const result = await fn();
      logger.debug(`✔ ${actionName} completed`, this.pageName);
      return result;
    } catch (error) {
      // Don't double-wrap if a nested action already threw a UIActionError
      if (error instanceof UIActionError) {
        throw error;
      }

      // ── 1. Log the error IMMEDIATELY (sync) before any async work ──
      // page.url() is synchronous in Playwright — always safe to call.
      const url = this.page.url();

      logger.error(
        `✖ ${actionName} failed | URL: ${url}`,
        this.pageName,
      );

      if (error instanceof Error) {
        logger.error(`  Cause: ${error.message}`, this.pageName);
      } else {
        logger.error(`  Cause: ${String(error)}`, this.pageName);
      }

      // ── 2. Best-effort async enrichment (may be killed by test timeout) ──
      const safeName = actionName.replace(/[^a-zA-Z0-9]/g, "-");
      const screenshotPath = `test-results/screenshots/${this.pageName}-${safeName}-${Date.now()}.png`;

      await this.page
        .screenshot({ path: screenshotPath, fullPage: true })
        .then(() => {
          logger.error(
            `  📸 Screenshot saved: ${screenshotPath}`,
            this.pageName,
          );
        })
        .catch(() => {
          logger.warn(
            `  Could not capture failure screenshot`,
            this.pageName,
          );
        });

      throw new UIActionError(actionName, this.pageName, url, error);
    }
  }

  /** Waits for the DOM to be fully loaded. Opt-in — call from subclasses when needed. */
  protected async waitForPageReady(): Promise<void> {
    await this.page.waitForLoadState("domcontentloaded");
  }
}

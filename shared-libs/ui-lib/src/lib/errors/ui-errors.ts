/**
 * Custom error types for UI test automation.
 * All errors preserve the original cause chain via the ES2022 `{ cause }` option.
 */

/** Base error for any UI page-object action failure. */
export class UIActionError extends Error {
  public readonly actionName: string;
  public readonly pageName: string;
  public readonly pageUrl: string;

  constructor(
    actionName: string,
    pageName: string,
    pageUrl: string,
    cause?: unknown,
  ) {
    const causeMessage = cause instanceof Error ? cause.message : String(cause);

    super(
      `[${pageName}] ${actionName} failed | URL: ${pageUrl} | ${causeMessage}`,
      { cause },
    );

    this.name = "UIActionError";
    this.actionName = actionName;
    this.pageName = pageName;
    this.pageUrl = pageUrl;
  }
}

/** Thrown when page navigation fails or lands on an unexpected URL. */
export class NavigationError extends UIActionError {
  public readonly expectedUrl: string;
  public readonly actualUrl: string;

  constructor(
    pageName: string,
    expectedUrl: string,
    actualUrl: string,
    cause?: unknown,
  ) {
    super("navigation", pageName, actualUrl, cause);
    this.name = "NavigationError";
    this.expectedUrl = expectedUrl;
    this.actualUrl = actualUrl;
  }
}

/** Thrown when an element cannot be found within the configured timeout. */
export class ElementNotFoundError extends UIActionError {
  public readonly selector: string;
  public readonly timeoutMs: number;

  constructor(
    actionName: string,
    pageName: string,
    pageUrl: string,
    selector: string,
    timeoutMs: number,
    cause?: unknown,
  ) {
    super(actionName, pageName, pageUrl, cause);
    this.name = "ElementNotFoundError";
    this.selector = selector;
    this.timeoutMs = timeoutMs;
  }
}

/** Thrown when a file-upload interaction fails. */
export class FileUploadError extends UIActionError {
  public readonly filePath: string;

  constructor(
    pageName: string,
    pageUrl: string,
    filePath: string,
    cause?: unknown,
  ) {
    super("fileUpload", pageName, pageUrl, cause);
    this.name = "FileUploadError";
    this.filePath = filePath;
  }
}

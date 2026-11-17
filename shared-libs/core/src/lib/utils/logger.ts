// Log levels in ascending severity order
export type LogLevel = "DEBUG" | "INFO" | "WARN" | "ERROR";

const LOG_LEVEL_RANK: Record<LogLevel, number> = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
};

const LOG_LEVEL_EMOJI: Record<LogLevel, string> = {
  DEBUG: "🔍",
  INFO: "ℹ️ ",
  WARN: "⚠️ ",
  ERROR: "❌",
};

/**
 * Resolves the minimum log level from the LOG_LEVEL environment variable.
 * Falls back to DEBUG so nothing is hidden by default during local runs.
 */
function resolveMinLevel(): LogLevel {
  const env = (process.env["LOG_LEVEL"] ?? "DEBUG").toUpperCase();
  if (env in LOG_LEVEL_RANK) return env as LogLevel;
  return "DEBUG";
}

function timestamp(): string {
  return new Date().toISOString().replace("T", " ").slice(0, 19);
}

function formatContext(context?: string): string {
  return context ? ` [${context}]` : "";
}

export class Logger {
  private readonly minLevel: LogLevel;

  constructor(minLevel?: LogLevel) {
    this.minLevel = minLevel ?? resolveMinLevel();
  }

  private shouldLog(level: LogLevel): boolean {
    return LOG_LEVEL_RANK[level] >= LOG_LEVEL_RANK[this.minLevel];
  }

  private format(level: LogLevel, message: string, context?: string): string {
    const emoji = LOG_LEVEL_EMOJI[level];
    return `[${timestamp()}] ${emoji} [${level.padEnd(5)}]${formatContext(context)} ${message}`;
  }

  debug(message: string, context?: string): void {
    if (this.shouldLog("DEBUG")) {
      console.debug(this.format("DEBUG", message, context));
    }
  }

  info(message: string, context?: string): void {
    if (this.shouldLog("INFO")) {
      console.info(this.format("INFO", message, context));
    }
  }

  warn(message: string, context?: string): void {
    if (this.shouldLog("WARN")) {
      console.warn(this.format("WARN", message, context));
    }
  }

  error(message: string, context?: string): void {
    if (this.shouldLog("ERROR")) {
      console.error(this.format("ERROR", message, context));
    }
  }

  /**
   * Logs a labelled payload as pretty-printed JSON.
   * Each JSON line is indented uniformly so it aligns under the log prefix.
   * Uses DEBUG level so it can be silenced in CI by setting LOG_LEVEL=INFO.
   */
  logPayload(label: string, payload: unknown, context?: string): void {
    if (this.shouldLog("DEBUG")) {
      const json = JSON.stringify(payload, null, 2);
      const indent = " ".repeat(4);
      const indented = json
        .split("\n")
        .map((line) => `${indent}${line}`)
        .join("\n");
      console.debug(this.format("DEBUG", `${label}:\n${indented}`, context));
    }
  }

  /** Convenience: print a visual section separator — single line, clean alignment */
  section(title: string, context?: string): void {
    if (this.shouldLog("INFO")) {
      const pad = "─".repeat(10);
      console.info(this.format("INFO", `${pad} ${title} ${pad}`, context));
    }
  }
}

/** Shared singleton — import this everywhere instead of `new Logger()` */
export const logger = new Logger();

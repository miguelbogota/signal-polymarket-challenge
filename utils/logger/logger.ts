/** Describes the structured metadata attached to a log event. */
type Context = Record<string, unknown>;

/** Provides consistently shaped application logs with caller-supplied metadata. */
class Logger {
  /** Emits a structured informational event. */
  info(event: string, context: Context = {}) {
    console.info(JSON.stringify({ level: "info", event, ...context }));
  }

  /** Emits a structured error event. */
  error(event: string, context: Context = {}) {
    console.error(JSON.stringify({ level: "error", event, ...context }));
  }
}

/** Provides the shared logger instance for application consumers. */
export const logger = new Logger();

import type { LogLevel, Optional } from '@/shared'

import type { ILoggerClient, IServiceScope } from '../contracts'
import type { XenoRegistry } from '../registries'

/**
 * @description Interface defining the structure of a logger configuration object. This includes properties such as the minimum log level that should be captured by the logger. The log level determines the severity of log messages that will be processed and forwarded to the logging clients, allowing developers to control the verbosity of logs based on the needs of the application and its operational context.
 *
 *
 * @author Xeno
 * @version 1.0.0
 * @since 2025-09-30
 * @link https://github.com/xeno-js/xeno-js
 */
export interface LoggerConfig<TRegistry extends XenoRegistry = XenoRegistry> {
  /**
   * @description
   * The level property specifies the minimum log level that should be captured by the logger. Log levels typically include DEBUG, INFO, WARN, and ERROR, with each level representing a different severity of log messages. By setting the log level, developers can control the verbosity of the logs and ensure that only relevant information is captured based on the needs of the application and its operational context.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  level?: Optional<LogLevel>
  /** @description Flag to enable or disable console logging. If set to true, log messages will be output to the console. If set to false or not defined, console logging will be disabled, and log messages will not be output to the console.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  console: boolean
  /** @description Optional array of custom logger clients to be used in addition to the built-in console, Sentry, and Pino loggers. If provided, these custom loggers will be registered and used for capturing and managing log messages based on their respective configurations. If not defined or empty, only the enabled built-in loggers will be used.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  customLoggers?: Optional<((container: IServiceScope<TRegistry>) => ILoggerClient)[]>
}

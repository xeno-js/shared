import type { XenoRegistry } from '@/domain/registries'
import type { LogLevel, Optional } from '@/shared'

import type { IServiceScope } from '../container'
import type { ILoggerClient } from '../loggers'

export interface ILoggerSetup<TRegistry extends XenoRegistry = XenoRegistry> {
  /**
   * @description Add a console logger to the pipeline
   * @param enabled Whether the logger is enabled
   * @param level The log level
   */
  addConsole(enabled: boolean, level?: Optional<LogLevel>): void

  /**
   * @description Add a custom logger to the pipeline
   * @param client The logger client
   */
  addCustomLogger(client: (container: IServiceScope<TRegistry>) => ILoggerClient): void

  /**
   * @description Gets all loggers
   * @returns Array including loggers
   */
  getCustomLoggers(): ((container: IServiceScope<TRegistry>) => ILoggerClient)[]
}

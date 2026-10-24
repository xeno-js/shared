import type { Dictionary, Optional } from '@/shared'

export interface IdempotencyOptions extends IdempotencyConfig {
  /**
   * The registry of intent configurations, where each intent is associated with its own configuration.
   */
  intentRegistry?: Optional<Dictionary<IdempotencyConfig>>
}

/** @description Configuration for idempotency, allowing the definition of TTLs for locks and processed results. If enabled, the command bus pipeline will include specific behaviors to handle idempotency, such as acquiring locks to ensure that a command with the same ID is processed only once and storing the results of processed commands for a defined period. The configuration includes specific details for TTLs, such as the duration of the lock and the duration for which processed results are retained, providing granular control over how idempotency is managed within the application.
 *
 * @author Xeno
 * @version 1.0.0
 * @since 2025-09-30
 * @link https://github.com/xeno-js/xeno-js
 */
interface IdempotencyConfig {
  /** @description Optional TTL in seconds for the idempotency lock. This defines how long the lock should be held to prevent duplicate processing of commands with the same ID. If not defined, a default value will be used.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  lockTtlSeconds?: Optional<number>
  /** @description Optional TTL in seconds for storing the results of processed commands. This defines how long the results of a processed command should be retained in the cache, allowing for retrieval if the same command is received again within that period. If not defined, a default value will be used.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  processedTtlSeconds?: Optional<number>
}

/** @description Configuration for concurrency management, allowing the definition of maximum retries and delay strategies for retries. If enabled, the command bus pipeline will include specific behaviors to handle concurrency conflicts, such as retrying a command in case of failure due to a conflict. The configuration includes specific details for retries, such as the maximum number of attempts and delay strategies (e.g., exponential backoff with jitter) between attempts, providing granular control over how concurrency is managed within the application.
 *
 * @author Xeno
 * @version 1.0.0
 * @since 2025-09-30
 * @link https://github.com/xeno-js/xeno-js
 */
export interface ConcurrencyOptions extends ConcurrencyConfig {
  /**
   * @description Optional registry for concurrency configurations, allowing the definition of specific concurrency settings for different intents. This allows for fine-grained control over concurrency behavior based on the intent of the command being processed. If not defined, a default concurrency configuration will be used for all intents.
   */
  intentRegistry?: Optional<Dictionary<ConcurrencyConfig>>
}

interface ConcurrencyConfig {
  /** @description Optional maximum number of retry attempts in case of concurrency conflicts. This defines how many times the command bus should attempt to retry a command if it fails due to a concurrency issue, such as a version conflict in an optimistic concurrency control scenario. If not defined, a default value will be used.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  maxRetries?: Optional<number> /** @description Optional configuration for delay strategies between retry attempts. This can include settings for exponential backoff, jitter, or fixed delays to manage the timing of retries in case of concurrency conflicts. If not defined, a default delay strategy will be used.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  delayConfig?: {
    /** @description Base delay in milliseconds for retries. This defines the initial delay before the first retry attempt in case of a concurrency conflict. If using an exponential backoff strategy, this base delay will be multiplied for each subsequent retry attempt. If not defined, a default value will be used.
     *
     * @author Xeno
     * @version 1.0.0
     * @since 2025-09-30
     * @link https://github.com/xeno-js/xeno-js
     */
    baseDelayMs?: number
    /** @description Optional maximum delay in milliseconds for retries. This defines the upper limit for the delay between retry attempts, preventing excessively long delays in case of multiple retries. If not defined, a default value will be used.
     *
     * @author Xeno
     * @version 1.0.0
     * @since 2025-09-30
     * @link https://github.com/xeno-js/xeno-js
     */
    maxJitterMs?: number
  }
}

/** @description Configuration for performance monitoring, including the ability to set a threshold in milliseconds for logging slow operations. If enabled, the PerformancePipeline will log a warning whenever the execution of a command or query exceeds the specified threshold, helping to identify potential performance bottlenecks in the application. If the threshold is not defined, all operations will be monitored without duration-based filtering.
 *
 * @author Xeno
 * @version 1.0.0
 * @since 2025-09-30
 * @link https://github.com/xeno-js/xeno-js
 */
export interface PerformanceOptions {
  /** @description Optional threshold in milliseconds for logging slow operations. If defined, the PerformancePipeline will log a warning whenever the execution of a command or query exceeds this duration, allowing for performance monitoring and optimization. If not defined, all operations will be monitored without duration-based filtering.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  thresholdMs?: Optional<number>
  /** @description Optional threshold in milliseconds for logging slow operations by intent. If defined, the PerformancePipeline will log a warning whenever the execution of a command or query exceeds this duration, allowing for performance monitoring and optimization. If not defined, all operations will be monitored without duration-based filtering.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  intentThresholdMs?: Optional<Dictionary<{ thresholdMs: number }>>
}

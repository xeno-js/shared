import type { AuthorizationOptions, IdempotencyOptions } from '@/domain/config'
import type { XenoRegistry } from '@/domain/registries'
import type { Optional } from '@/shared'

import type { ICommand, IPipelineBehavior, IQuery, IRequest } from '../cqrs'

export interface IPipelineSetup<TRegistry extends XenoRegistry = XenoRegistry> {
  set authzOpts(options: AuthorizationOptions<TRegistry>)
  get authzOpts(): Optional<AuthorizationOptions<TRegistry>>

  set idempotencyOpts(options: IdempotencyOptions)
  get idempotencyOpts(): Optional<IdempotencyOptions>

  /**
   * Add a behavior to the pipeline that will be applied to all requests.
   * @param behavior The behavior to add.
   * @param order The order in which the behavior should be applied. Lower numbers are applied first.
   * @return The pipeline setup.
   */
  addCommon(behavior: IPipelineBehavior<IRequest<unknown>, unknown>, order: number): this

  /**
   * Add a behavior to the pipeline that will be applied to all commands.
   * @param behavior The behavior to add.
   * @param order The order in which the behavior should be applied. Lower numbers are applied first.
   * @return The pipeline setup.
   */
  addCommand(behavior: IPipelineBehavior<ICommand<unknown>, unknown>, order: number): this

  /**
   * Add a behavior to the pipeline that will be applied to all queries.
   * @param behavior The behavior to add.
   * @param order The order in which the behavior should be applied. Lower numbers are applied first.
   * @return The pipeline setup.
   */
  addQuery(): this

  /**
   * Get the sorted command behaviors for the pipeline.
   * @return The sorted behaviors.
   */
  getSortedCommandBehaviors(): IPipelineBehavior<ICommand<unknown>, unknown>[]

  /**
   * Get the sorted query behaviors for the pipeline.
   * @return The sorted behaviors.
   */
  getSortedQueryBehaviors(): IPipelineBehavior<IQuery<unknown>, unknown>[]
}

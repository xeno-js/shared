import type { XenoRegistry } from '../registries'

export type ServicesProxy<TRegistry extends XenoRegistry = XenoRegistry> = {
  readonly [K in keyof TRegistry]: TRegistry[K]
}

/**
 * @fileoverview Defines the ServiceDescriptor type for service registrations.

   * 
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js 
   */

/**
 * @description The possible lifetimes for a service registration, determining
 * how instances are managed and cached by the container.

   * 
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js 
   */
export type Lifetime = 'singleton' | 'transient' | 'scoped'

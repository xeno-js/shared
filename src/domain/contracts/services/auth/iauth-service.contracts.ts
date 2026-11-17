/* eslint-disable @typescript-eslint/naming-convention */
import type { ResultType } from '@/domain'
import type {
  AuthClaims,
  Dictionary,
  IPaginatedResult,
  Maybe,
  Optional,
  Provider,
  Session,
} from '@/shared'

export interface UpdateIdentityDto {
  readonly email?: string
  readonly password?: string
  readonly emailConfirm?: boolean
  readonly phoneConfirm?: boolean
  readonly banDuration?: string
  readonly appMetadata?: {
    roles?: string[]
    permissions?: string[]
    tenant_id?: Optional<string>
    [key: `custom_${string}`]: unknown
  }
  readonly userMetadata?: Record<string, unknown>
}

/**
 * @description IAuthService defines the contract for authentication services.
 * It provides methods to check if a user is authenticated and to retrieve the user's claims.
 *
 * @author Xeno
 * @version 1.0.0
 * @since 2025-09-30
 * @link https://github.com/xeno-js/xeno-js
 */
export interface IBaseAuthService {
  /**
   * Checks if the user is authenticated.
   * @returns A promise that resolves to true if the user is authenticated, false otherwise.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  isAuthenticated(): Promise<boolean>

  /**
   * Retrieves the user's claims.
   * @returns A promise that resolves to the user's claims, or null if not authenticated.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  getUser(): Promise<ResultType<Maybe<AuthClaims>>>

  /**
   * Authenticates a user based on a token.
   * @param token The token to authenticate the user.
   * @returns A promise that resolves to the user's claims, or null if not authenticated.
   *
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js
   */
  authenticate(token: string): Promise<ResultType<AuthClaims>>
}

/**
 * @description IAuthService defines the contract for authentication services.
 * It provides methods to check if a user is authenticated and to retrieve the user's claims.

   * 
   * @author Xeno
   * @version 1.0.0
   * @since 2025-09-30
   * @link https://github.com/xeno-js/xeno-js 
   */
export interface IAuthService {
  /**
   * Signs in a user by the specified provider.
   * @param provider The provider to use for signing in the user.
   * @returns A promise that resolves to the URL for the specified provider.
   */
  signInWithProvider(
    provider: Provider,
    options?: {
      redirectTo?: string
      scopes?: string
      queryParams?: Dictionary<string>
      skipBrowserRedirect?: boolean
    },
  ): Promise<ResultType<{ url: string }>>

  /**
   * @description Gets the current session of the user.
   * @returns A promise that resolves to the current session of the user.
   */
  getSession(): Promise<ResultType<Maybe<Session>>>

  /**
   * @description Signs out the user.
   * @param scope The scope of the sign-out operation ('global', 'local', or 'others').
   * @returns A promise that resolves when the user is signed out.
   */
  signOut(scope?: 'global' | 'local' | 'others'): Promise<ResultType<void>>

  /**
   * @description Exchanges the code for a session.
   * @param code the code to exchange for a session
   * @param flowId The flow ID associated with the code exchange (optional).
   * @returns A promise that resolves to the session with the exchanged code.
   */
  exchangeCodeForSession(code: string, flowId?: string): Promise<ResultType<Optional<Session>>>
}

/**
 * @description ISuperAdminAuthService defines the contract for super admin authentication services.
 * It provides methods to manage users, including updating identity, listing users, deleting users, and retrieving users by ID.
 */
export interface ISuperAdminAuthService {
  /**
   * @description Updates the metadata (roles, permissions, tenant_id) or other attributes of a specific user.
   * @param userId The ID of the user to update.
   * @param data The data to update for the user.
   * @returns A promise that resolves when the update is complete.
   */
  updateIdentity(userId: string, data: UpdateIdentityDto): Promise<ResultType<void>>

  /**
   * @description Lists all users registered in Supabase Auth (useful for an Excel-style table in the Dashboard).
   * @param page The page number to retrieve (default is 1).
   * @param perPage The number of users per page (default is 10).
   * @returns A promise that resolves to a paginated result of user claims.
   */
  listUsers(page?: number, perPage?: number): Promise<ResultType<IPaginatedResult<AuthClaims>>>

  /**
   * @description Deletes or disables a user directly from Supabase Auth.
   * @param softDelete Indicates whether to perform a soft delete (default is false).
   * @returns A promise that resolves when the deletion is complete.
   */
  deleteUser(userId: string, softDelete?: boolean): Promise<ResultType<void>>

  /**
   * @description Retrieves a user by their ID.
   * @param userId The ID of the user to retrieve.
   * @returns A promise that resolves to the user's claims.
   */
  getUserById(userId: string): Promise<ResultType<AuthClaims>>
}

/**
 * @description An extended version of the IAuthService interface that includes additional methods for managing user sessions.
 * @author Xeno
 * @version 1.0.0
 * @since 2025-09-30
 * @link https://github.com/xeno-js/xeno-js
 */
export interface IExtendendAuthService extends IBaseAuthService, IAuthService {}

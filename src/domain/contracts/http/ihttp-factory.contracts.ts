import type { IRemoteDataSource } from '../datasources'

/**
 * @description Factory for the resolution of IHttpClient.
 */
export interface IHttpClientFactory {
  /**
   * @description Returns an instance of IHttpClient.
   * @returns An instance of IHttpClient.
   */
  get(name: string): IRemoteDataSource
}

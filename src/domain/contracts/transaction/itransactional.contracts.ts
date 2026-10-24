/*
 * @file itransactional.contracts.ts
 * @description This file contains the interface for the Transactional pattern.
 */

/**
 * Interface for the Transactional pattern.
 * @template TTransaction - The type of the transaction.
 */
export interface ITransactionalDb<TTransaction = unknown> {
  /**
   * Executes a callback function within a transaction.
   * @param callback The callback function to execute.
   * @returns A promise that resolves with the result of the callback function.
   */
  transaction<T>(callback: (tx: TTransaction) => Promise<T>): Promise<T>
}

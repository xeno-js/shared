export interface IBackgroundWorker {
  start(intervalMs?: number): void
  stop(): void
}

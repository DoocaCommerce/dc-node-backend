import { LoggerMessage } from './LoggerMessage'

export interface Logger {
    error<T = any>(message: LoggerMessage<T>): void
    warning<T = any>(message: LoggerMessage<T>): void
    info<T = any>(message: LoggerMessage<T>): void
    success<T = any>(message: LoggerMessage<T>): void
}

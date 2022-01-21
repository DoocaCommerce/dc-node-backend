import { DbResult } from './DbResult'

export interface DbCommand {
    execute<T>(): Promise<DbResult<T>>
}

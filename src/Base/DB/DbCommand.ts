import { DbResult } from './DbResult'

export interface DbCommand<F = any, R = any> {
    execute(filter: F): Promise<DbResult<R>>
}

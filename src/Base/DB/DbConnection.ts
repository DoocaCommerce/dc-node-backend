import { DbCommand } from './DbCommand'
import { DbCommandType } from './DbCommandType'

export interface DbConnection {
    open(): Promise<DbConnection>
    createCommand(type: DbCommandType): DbCommand
}

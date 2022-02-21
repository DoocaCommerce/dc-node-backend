import { DbCommand } from './DbCommand'

export interface DbConnection {
    open(): Promise<DbConnection>
    createCommand(type: string): DbCommand
}

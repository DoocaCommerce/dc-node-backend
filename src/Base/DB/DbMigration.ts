import { DbConnection } from '.'

export abstract class DbMigration<T extends DbConnection> {
    constructor(protected conn: T) {}

    abstract up(): Promise<void>
    abstract down(): Promise<void>
}

import { DbConnection } from '.'

export abstract class DbMigration<T extends DbConnection> {
    constructor(protected conn: T) {}

    abstract up(): void
    abstract down(): void
}

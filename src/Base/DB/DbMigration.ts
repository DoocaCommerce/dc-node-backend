import { DbConnection } from '.'

export abstract class DbMigration {
    constructor(protected conn: DbConnection) {}

    abstract up(): void
    abstract down(): void
}

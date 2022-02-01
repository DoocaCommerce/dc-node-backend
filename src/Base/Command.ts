import { Handler } from './Handler'

export interface Command {
    execute(handler: Handler): Promise<void>
    undo(): Promise<void>
}

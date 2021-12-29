import { Application } from './Application'

export interface Process {
    execute(app: Application): Promise<void>
}

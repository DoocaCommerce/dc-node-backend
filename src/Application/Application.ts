import { Bootstrap } from './Bootstrap'
import { Process } from './Process'

export class Application {
    private processes: Process[] = []

    private constructor(bootstraps: Bootstrap[]) {
        for (const bootstrap of bootstraps) {
            bootstrap.handler()
        }
    }

    static create(bootstraps: Bootstrap[]): Application {
        return new Application(bootstraps)
    }

    addProcess(process: Process): Application {
        this.processes.push(process)
        return this
    }

    async run(): Promise<void> {
        for (const process of this.processes) {
            process.execute(this)
        }
    }
}

import { Application, Process } from '../..'

export class TestProcess implements Process {
    async execute(app: Application): Promise<void> {}
}

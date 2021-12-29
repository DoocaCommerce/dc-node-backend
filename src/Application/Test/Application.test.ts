import { Application } from '../'
import { TestBootstrap } from './__mocks__/TestBootstrap'
import { TestProcess } from './__mocks__/TestProcess'

describe('Application', () => {
    it('simple run', () => {
        const app = Application.create([]).run()
    })

    it('run with bootstrap', () => {
        const app = Application.create([new TestBootstrap()]).run()
    })

    it('run with process', () => {
        const app = Application.create([]).addProcess(new TestProcess()).run()
    })

    it('run with process and bootstrap', () => {
        const app = Application.create([new TestBootstrap()]).addProcess(new TestProcess()).run()
    })
})

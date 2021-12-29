import { DoocaException } from './DoocaException'

export class NotFoundDoocaException extends DoocaException {
    constructor(name: string) {
        super(`${name}_not_found`)
    }
}

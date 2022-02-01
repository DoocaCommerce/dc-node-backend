import { DoocaException } from '.'

export class NotImplementedYetDoocaException extends DoocaException {
    constructor() {
        super('not_implemented_yet')
    }
}

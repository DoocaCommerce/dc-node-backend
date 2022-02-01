import { NotFoundDoocaException } from '../Exceptions'

export class CacheKeyNotFoundDoocaException extends NotFoundDoocaException {
    constructor() {
        super('cache_key')
    }
}

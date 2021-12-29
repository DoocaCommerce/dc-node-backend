import { Paginated } from '../../Base/Paginated'
import { ClientResponse } from './ClientResponse'

export abstract class ClientResponsePagination<T> implements Paginated<T> {
    private meta: any

    constructor(protected response: ClientResponse) {
        this.meta = response.getData().meta
    }

    abstract getPageData(): T[]

    getTotalData(): number {
        return this.meta.total
    }

    getCurrentPage(): number {
        return this.meta.current_page
    }

    getLastPage(): number {
        return this.meta.last_page
    }
}

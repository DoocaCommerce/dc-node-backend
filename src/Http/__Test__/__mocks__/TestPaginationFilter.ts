import { Maybe, PaginationFilter } from '../../../Base'

export class TestPaginationFilter implements PaginationFilter {
    constructor(private page: number, private limit?: number) {}

    getLimit(): Maybe<number> {
        return Maybe.of<number>(this.limit)
    }

    getPage(): number {
        return this.page
    }
}

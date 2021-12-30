import { Paginated } from '../../../Base/Paginated'

export class TestPagination implements Paginated<string> {
    constructor(
        private data: string[],
        private totalData: number,
        private currentPage: number,
        private lastPage: number
    ) {}

    getPageData(): string[] {
        return this.data
    }

    getTotalData(): number {
        return this.totalData
    }

    getCurrentPage(): number {
        return this.currentPage
    }

    getLastPage(): number {
        return this.lastPage
    }
}

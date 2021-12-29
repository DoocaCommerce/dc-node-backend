export interface Paginated<T> {
    getPageData(): T[]
    getTotalData(): number
    getCurrentPage(): number
    getLastPage(): number
}

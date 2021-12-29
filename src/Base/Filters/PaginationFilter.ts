import { Maybe } from '../Maybe'

export interface PaginationFilter {
    getLimit(): Maybe<number>
    getPage(): number
}

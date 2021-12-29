import { FilterBase } from './Filters/FilterBase'
import { Paginated } from '../Base/Paginated'

export interface PaginatedFinder<F extends FilterBase, Result> {
    getAll(filter: F): Promise<Paginated<Result>>
}

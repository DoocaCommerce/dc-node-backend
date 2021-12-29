import { FilterBase } from './Filters/FilterBase'

export interface Finder<F extends FilterBase, Result> {
    getOneBy(filter: F): Promise<Result>
}

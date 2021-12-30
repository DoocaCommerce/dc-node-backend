import { Maybe } from '..'
import { PaginationFilter } from '../Base/Filters/PaginationFilter'

export class GqlPaginationFilter implements PaginationFilter {
    private constructor(private page: number, private first: number) {}

    static fromArgs(args: any): GqlPaginationFilter {
        return new GqlPaginationFilter(args.page || 1, args.first || 15)
    }

    getLimit(): Maybe<number> {
        return Maybe.of(this.first)
    }
    getPage(): number {
        return this.page
    }
}

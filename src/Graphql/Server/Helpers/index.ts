import { first, last } from '../../../Helpers'
import { Paginated } from '../../..'
import { PageInfo } from '../..'

export function buildPageInfo<T>(pagination: Paginated<T>): PageInfo {
    return {
        hasNextPage: pagination.getCurrentPage() < pagination.getLastPage(),
        hasPreviousPage: pagination.getCurrentPage() > 1,
        startCursor: first<any>(pagination.getPageData()).id,
        endCursor: last<any>(pagination.getPageData()).id
    }
}

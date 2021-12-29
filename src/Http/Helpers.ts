import { isNotEmpty } from '../Helpers'
import { Maybe, PaginationFilter } from '../Base'
import { ClientResponse } from './Client/ClientResponse'

export function maybePaginationToQueryStr(maybePagination: Maybe<PaginationFilter>): string {
    const toQueryStr = (pagination: PaginationFilter) =>
        `page=${pagination.getPage()}&${maybeLimitToQueryStr(pagination.getLimit())}`

    return maybePagination.map(toQueryStr).unsafeValue() || ''
}

export function maybeLimitToQueryStr(maybeLimit: Maybe<number>): string {
    const limit = (limitNum: number) => `limit=${limitNum}`
    const toQueryStr = (limitNum: number) => limit(limitNum)
    return maybeLimit.map(toQueryStr).unsafeValue() || limit(15)
}

export function isPaginated(response: ClientResponse): boolean {
    const data = response.getData()
    const hasData = (key: string) => key === 'data'
    return isNotEmpty(Object.keys(data).filter(hasData))
}

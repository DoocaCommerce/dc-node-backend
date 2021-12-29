import { Maybe } from '../../Base'
import { isPaginated, maybeLimitToQueryStr, maybePaginationToQueryStr } from '../Helpers'
import { TestClientResponse } from './__mocks__/Client/TestClientResponse'
import { TestPaginationFilter } from './__mocks__/TestPaginationFilter'

describe('Testing helpers', () => {
    it('create query string from paginationFilter', () => {
        const queryStrOk = maybePaginationToQueryStr(
            Maybe.of<TestPaginationFilter>(new TestPaginationFilter(1, 20))
        )
        expect(queryStrOk).toBe('page=1&limit=20')

        const queryStrNok = maybePaginationToQueryStr(Maybe.empty<TestPaginationFilter>())
        expect(queryStrNok).toBe('')
    })

    it('create query string from limit', () => {
        const queryStrOk = maybeLimitToQueryStr(Maybe.of<number>(20))
        expect(queryStrOk).toBe('limit=20')

        const queryStrNok = maybeLimitToQueryStr(Maybe.empty<number>())
        expect(queryStrNok).toBe('limit=15')
    })

    it('verify if client response is paginated', () => {
        expect(isPaginated(new TestClientResponse({}))).toBe(false)
        expect(isPaginated(new TestClientResponse({ data: [] }))).toBe(true)
    })
})

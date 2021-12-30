import { Maybe } from '../Base'
import {
    first,
    isEmpty,
    isNotEmpty,
    isNotNull,
    isNull,
    last,
    not,
    parseJsonToString,
    parseStringToJson,
    unsafeValue
} from '../Helpers'
describe('Helpers', () => {
    it('isNull', () => {
        expect(isNull(null)).toBe(true)
        expect(isNull(true)).toBe(false)
        expect(isNull(undefined)).toBe(true)
    })

    it('isNotNull', () => {
        expect(isNotNull(true)).toBe(true)
        expect(isNotNull(null)).toBe(false)
        expect(isNotNull(undefined)).toBe(false)
    })

    it('not', () => {
        expect(not(true)).toBe(false)
        expect(not(null)).toBe(true)
        expect(not(undefined)).toBe(true)
    })

    it('isEmpty', () => {
        expect(isEmpty(true)).toBe(false)
        expect(isEmpty(false)).toBe(false)
        expect(isEmpty(null)).toBe(true)
        expect(isEmpty(undefined)).toBe(true)
        expect(isEmpty({})).toBe(true)
        expect(isEmpty([])).toBe(true)
        expect(isEmpty({ id: 0 })).toBe(false)
        expect(isEmpty([0])).toBe(false)
        expect(isEmpty('')).toBe(true)
        expect(isEmpty('a')).toBe(false)
        expect(isEmpty(0)).toBe(false)
    })

    it('isNotEmpty', () => {
        expect(isNotEmpty(true)).toBe(true)
        expect(isNotEmpty(false)).toBe(true)
        expect(isNotEmpty(null)).toBe(false)
        expect(isNotEmpty(undefined)).toBe(false)
        expect(isNotEmpty({})).toBe(false)
        expect(isNotEmpty([])).toBe(false)
        expect(isNotEmpty({ id: 0 })).toBe(true)
        expect(isNotEmpty([0])).toBe(true)
        expect(isNotEmpty('')).toBe(false)
        expect(isNotEmpty('a')).toBe(true)
        expect(isNotEmpty(0)).toBe(true)
    })

    it('parseStringToJson', () => {
        expect(parseStringToJson('null')).toBeNull()
        expect(parseStringToJson('undefined')).toBeUndefined()
        expect(parseStringToJson('{}')).toMatchObject({})
        expect(parseStringToJson('[]')).toMatchObject([])
    })

    it('parseJsonToString', () => {
        expect(parseJsonToString(null)).toBe('null')
        expect(parseJsonToString(undefined)).toBe('undefined')
        expect(parseJsonToString({})).toBe('{}')
        expect(parseJsonToString([])).toBe('[]')
    })

    it('first', () => {
        expect(first([])).toBeUndefined()
        expect(first([1])).toBe(1)
    })

    it('last', () => {
        expect(last([])).toBeUndefined()
        expect(last([1, 2])).toBe(2)
    })

    it('unsafeValue', () => {
        expect(unsafeValue(Maybe.of(null))).toBeNull()
        expect(unsafeValue(Maybe.of('test'))).toBe('test')
        expect(unsafeValue(Maybe.of(null), 'test')).toBe('test')
    })
})

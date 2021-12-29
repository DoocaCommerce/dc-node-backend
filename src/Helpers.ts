import { Maybe } from './Base/Maybe'

export function not(value: any): boolean {
    return !value
}

export function isNull(value: any): boolean {
    return value === null || value === undefined
}

export function isNotNull(value: any): boolean {
    return not(isNull(value))
}

export function isEmpty(value: any): boolean {
    if (Array.isArray(value) || typeof value === 'string') return value.length === 0
    if (typeof value === 'object' && value != null) return isEmpty(Object.keys(value))
    return isNull(value)
}

export function isNotEmpty(value: any): boolean {
    return not(isEmpty(value))
}

export function parseStringToJson(value: string): any {
    if (value == 'undefined') return undefined
    return JSON.parse(value)
}

export function parseJsonToString(value: any): string {
    if (value === undefined) return 'undefined'
    if (value === null) return 'null'
    return JSON.stringify(value)
}

export function first(items: any[]): any {
    return items[0]
}

export function last(items: any[]): any {
    return first(items.splice(-1))
}

export function unsafeValue<T>(maybe: Maybe<T>, defaultValue: any = null): any {
    return maybe.unsafeValue() || defaultValue
}

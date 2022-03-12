import { MapCallback } from '.'
import { DoocaException, Satisfier, Validator } from './Base'
import { Either } from './Base/Either/Either'
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

export const filled = isNotEmpty

export function parseStringToJson(value: string): any {
    if (value == 'undefined') return undefined
    return JSON.parse(value)
}

export function parseJsonToString(value: any): string {
    if (value === undefined) return 'undefined'
    if (value === null) return 'null'
    return JSON.stringify(value)
}

export function first<T = any>(items: T[]): T {
    return items[0]
}

export function last<T = any>(items: T[]): T {
    return first(items.splice(-1))
}

export async function isValid<T = any>(validator: Validator<T>, data: T): Promise<boolean> {
    try {
        await validator.validate(data)
        return true
    } catch {
        return false
    }
}

export async function isNotValid<T = any>(validator: Validator<T>, data: T): Promise<boolean> {
    return not(await isValid(validator, data))
}

export function isSatisfied(data: Satisfier): boolean {
    return data.isSatisfied()
}

export function isNotSatisfied(data: Satisfier): boolean {
    return not(data.isSatisfied())
}

export function unsafeValue<T = any>(data: Maybe<T> | Either<T>, defaultValue: any = null): any {
    return data.unsafeValue() || defaultValue
}

export function either(data: Either, success: MapCallback, error: MapCallback) {
    const name = data.constructor.name
    switch (name) {
        case 'Right':
            return unsafeValue(data.map(success))
        case 'Left':
            return unsafeValue(data.map(error))
    }
}

export function throwIf<T extends DoocaException = any>(
    isWrong: boolean,
    exception: new (data?: any) => T,
    data?: any
): void {
    if (isWrong) throw new exception(data)
}

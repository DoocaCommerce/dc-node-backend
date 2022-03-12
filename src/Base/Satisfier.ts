export interface Satisfier<T = any> {
    isSatisfied(data: T): boolean
}

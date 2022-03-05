export interface Validator<T = any> {
    validate(data: T): Promise<void>
}

export interface Handler<T = any> {
    getSource(): string
    getData(): T
}

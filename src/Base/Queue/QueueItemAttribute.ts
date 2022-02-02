export interface QueueItemAttribute<T = any> {
    getName(): string
    getValue(): T
}

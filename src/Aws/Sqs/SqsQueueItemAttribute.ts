import { QueueItemAttribute } from '../../Base/Queue/QueueItemAttribute'

export class SqsQueueItemAttribute<T = any> implements QueueItemAttribute<T> {
    private constructor(private name: string, protected value: T) {}

    getValue(): T {
        return this.value
    }

    getName(): string {
        return this.name
    }

    static from(attrs?: Record<string, any>): SqsQueueItemAttribute[] {
        return Object.entries(attrs || {}).map(
            ([key, value]) => new SqsQueueItemAttribute(key, value)
        )
    }
}

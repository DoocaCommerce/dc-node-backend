import { Message, ReceiveMessageResult, SendMessageCommandInput } from '@aws-sdk/client-sqs'
import { QueueItemAttribute } from '../../Base/Queue/QueueItemAttribute'
import { QueueItemEntity } from '../../Base/Queue/QueueItemEntity'
import { first, isEmpty } from '../../Helpers'
import { SqsQueueItemAttribute } from './SqsQueueItemAttribute'

export class SqsQueueItemEntity<T = any> implements QueueItemEntity<T, string> {
    constructor(private message?: Message) {}

    getId(): string {
        return this.message?.ReceiptHandle || ''
    }

    getData(): T {
        return JSON.parse(this.message?.Body || '') as T
    }

    getAttributes(): QueueItemAttribute[] {
        return SqsQueueItemAttribute.from(this.message?.Attributes)
    }

    isEmpty(): boolean {
        return isEmpty(this.message?.ReceiptHandle)
    }

    static from<T = any>(messages?: Message[]): SqsQueueItemEntity<T>[] {
        return messages?.map(message => new SqsQueueItemEntity<T>(message)) || []
    }

    static getFirst<T = any>(messages?: Message[]): SqsQueueItemEntity<T> {
        return (
            first<SqsQueueItemEntity<T>>(SqsQueueItemEntity.from(messages)) ||
            new SqsQueueItemEntity()
        )
    }
}

import { Message, ReceiveMessageResult, SendMessageCommandInput } from '@aws-sdk/client-sqs'
import { QueueItem } from '../../Base/Queue'
import { first, isEmpty } from '../../Helpers'

export abstract class SqsQueueItem<T = any> implements QueueItem<T> {
    constructor(protected messageBody: string) {}

    abstract getData(): T

    isEmpty(): boolean {
        return isEmpty(this.messageBody)
    }
}

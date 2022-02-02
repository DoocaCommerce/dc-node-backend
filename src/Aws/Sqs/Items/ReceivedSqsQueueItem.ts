import { Message, ReceiveMessageCommandOutput, SendMessageCommandInput } from '@aws-sdk/client-sqs'
import { QueueItemAttribute } from '../../../Base/Queue/QueueItemAttribute'
import { first, isEmpty } from '../../../Helpers'
import { SqsQueueItem } from '../SqsQueueItem'

export class ReceivedSqsQueueItem extends SqsQueueItem<string> {
    constructor(messageBody: string, private receiptHandle: string) {
        super(messageBody)
    }

    getReceiptHandle(): string {
        return this.receiptHandle
    }

    getData(): string {
        return this.messageBody
    }

    isEmpty(): boolean {
        return isEmpty(this.messageBody) && isEmpty(this.receiptHandle)
    }

    getAttributes(): QueueItemAttribute<any>[] {
        return []
    }

    static fromReceivedMessage(received: ReceiveMessageCommandOutput): ReceivedSqsQueueItem {
        const message = first<Message>(received.Messages || [])
        if (isEmpty(message)) return new ReceivedSqsQueueItem('', '')
        return new ReceivedSqsQueueItem(message.Body || '', message.ReceiptHandle || '')
    }
}

import {
    DeleteMessageCommand,
    ReceiveMessageCommand,
    SendMessageCommand,
    SQSClient
} from '@aws-sdk/client-sqs'
import { Queue } from '../../Base/Queue'
import { AddSqsQueueItem } from './Items/AddSqsQueueItem'
import { ReceivedSqsQueueItem } from './Items/ReceivedSqsQueueItem'
import { SqsConfig } from './SqsConfig'
import { SqsQueueItem } from './SqsQueueItem'

export class SqsQueue implements Queue<SqsQueueItem> {
    private sqs: SQSClient

    constructor(private config: SqsConfig) {
        this.sqs = new SQSClient({
            region: config.region,
            endpoint: config.endpoint,
            credentials: {
                accessKeyId: config.accessKeyId,
                secretAccessKey: config.secretAccessKey
            }
        })
    }

    async add(item: AddSqsQueueItem): Promise<Queue<SqsQueueItem>> {
        await this.sqs.send(
            new SendMessageCommand(item.setQueueUrl(this.config.queueUrl).getData())
        )
        return this
    }

    async getFirstItem(): Promise<ReceivedSqsQueueItem> {
        const receivedMessage = await this.sqs.send(
            new ReceiveMessageCommand({
                QueueUrl: this.config.queueUrl
            })
        )
        return ReceivedSqsQueueItem.fromReceivedMessage(receivedMessage)
    }

    async removeItem(item: ReceivedSqsQueueItem): Promise<Queue<SqsQueueItem>> {
        await this.sqs.send(
            new DeleteMessageCommand({
                QueueUrl: this.config.queueUrl,
                ReceiptHandle: item.getReceiptHandle()
            })
        )
        return this
    }
}

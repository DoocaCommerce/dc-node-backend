import {
    DeleteMessageCommand,
    ReceiveMessageCommand,
    SendMessageCommand,
    SQSClient
} from '@aws-sdk/client-sqs'
import { Queue } from '../../Base/Queue'
import { SqsConfig } from './SqsConfig'
import { QueueItem } from '../../Base/Queue'
import { QueueItemEntity } from '../../Base/Queue/QueueItemEntity'
import { SqsQueueItemEntity } from './SqsQueueItemEntity'

export class SqsQueue<T = any> implements Queue<QueueItem<T>> {
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

    async add(item: QueueItem<T>): Promise<Queue<QueueItem<T>>> {
        const MessageBody = JSON.stringify(item.getData())
        const QueueUrl = this.config.queueUrl
        await this.sqs.send(new SendMessageCommand({ MessageBody, QueueUrl }))
        return this
    }

    async getFirstItem(): Promise<QueueItemEntity<T>> {
        const QueueUrl = this.config.queueUrl
        const receivedMessage = await this.sqs.send(new ReceiveMessageCommand({ QueueUrl }))
        return SqsQueueItemEntity.getFirst(receivedMessage.Messages)
    }

    async removeItem(item: QueueItemEntity<T>): Promise<Queue<QueueItem<T>>> {
        const QueueUrl = this.config.queueUrl
        const ReceiptHandle = item.getId()
        await this.sqs.send(new DeleteMessageCommand({ QueueUrl, ReceiptHandle }))
        return this
    }
}

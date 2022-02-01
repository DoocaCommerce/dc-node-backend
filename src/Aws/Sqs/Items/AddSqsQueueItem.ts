import { SendMessageCommandInput } from '@aws-sdk/client-sqs'
import { isEmpty } from '../../../Helpers'
import { SqsQueueItem } from '../SqsQueueItem'

export class AddSqsQueueItem extends SqsQueueItem<SendMessageCommandInput> {
    private queueUrl: string = ''

    constructor(messageBody: string) {
        super(messageBody)
    }

    getData(): SendMessageCommandInput {
        if (this.isEmpty()) throw new Error('queue_url_must_to_be_filled')

        return {
            MessageBody: this.messageBody,
            QueueUrl: this.queueUrl
        }
    }

    setQueueUrl(value: string): AddSqsQueueItem {
        this.queueUrl = value
        return this
    }

    isEmpty(): boolean {
        return isEmpty(this.messageBody) && isEmpty(this.queueUrl)
    }
}

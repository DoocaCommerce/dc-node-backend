import { Queue, QueueItem } from '../../../Base/Queue'
import { SqsQueue } from '../SqsQueue'
import { AddSqsQueueItem } from '../Items/AddSqsQueueItem'
import { not } from '../../../Helpers'
import { config } from 'dotenv'

describe('SQS Queue', () => {
    let queue: Queue<QueueItem>

    beforeAll(async () => {
        config()

        queue = new SqsQueue({
            region: process.env.AWS_REGION as string,
            accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
            queueUrl: process.env.AWS_QUEUE_URL as string
        })
    })

    beforeEach(async () => {
        await queue.add(new AddSqsQueueItem(`TEST ${Math.floor(Math.random() * 10)}`))
    })

    it('get and remove item', async () => {
        let item = await queue.getFirstItem()
        while (not(item.isEmpty())) {
            await queue.removeItem(item)
            item = await queue.getFirstItem()
        }
    })
})

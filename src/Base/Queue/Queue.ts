import { QueueItem } from './QueueItem'
import { QueueItemEntity } from './QueueItemEntity'

export abstract class Queue<I extends QueueItem> {
    abstract add(item: I): Promise<Queue<I>>
    abstract getFirstItem(): Promise<QueueItemEntity>
    abstract removeItem(item: QueueItemEntity): Promise<Queue<I>>
}

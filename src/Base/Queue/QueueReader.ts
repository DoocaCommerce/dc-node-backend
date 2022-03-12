import { QueueItemEntity } from './QueueItemEntity'

export interface QueueReader {
    getItems(): Promise<QueueItemEntity[]>
}

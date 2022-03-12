import { QueueItemEntity } from './QueueItemEntity'

export interface QueueItemRemover<ID = any, RESULT = any> {
    remove(item: QueueItemEntity<ID, RESULT>): Promise<RESULT>
}

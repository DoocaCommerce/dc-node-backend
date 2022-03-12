import { QueueItem } from './QueueItem'

export interface Queuer<I extends QueueItem = QueueItem> {
    add(item: I): Promise<Queuer<I>>
}

import { QueueItem } from './QueueItem'

export abstract class Queue<I extends QueueItem = any> {
    abstract add(item: I): Promise<Queue<I>>
    abstract getFirstItem(): Promise<I>
    abstract removeItem(item: I): Promise<Queue<I>>
}

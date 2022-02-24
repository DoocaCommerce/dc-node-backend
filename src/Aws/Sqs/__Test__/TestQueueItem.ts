import { QueueItem } from '../../..'
import { QueueItemAttribute } from '../../../Base/Queue/QueueItemAttribute'

export class TestQueueItem implements QueueItem<string> {
    constructor(private data: string) {}

    getAttributes(): QueueItemAttribute<any>[] {
        return []
    }

    getData(): string {
        return this.data
    }
}

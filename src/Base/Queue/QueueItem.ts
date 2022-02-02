import { Emptiable } from '../Emptiable'
import { Result } from '../Result'
import { QueueItemAttribute } from './QueueItemAttribute'

export interface QueueItem<T = any> extends Result<T>, Emptiable {
    getAttributes(): QueueItemAttribute[]
}

import { Emptiable } from '../Emptiable'
import { Result } from '../Result'

export interface QueueItem<T = any> extends Result<T>, Emptiable {}

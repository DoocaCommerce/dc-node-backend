import { Entity } from '..'
import { Emptiable } from '../Emptiable'
import { Result } from '../Result'
import { QueueItemAttribute } from './QueueItemAttribute'

export interface QueueItemEntity<RESULT = any, ID = string>
    extends Entity<ID>,
        Result<RESULT>,
        Emptiable {
    getAttributes(): QueueItemAttribute[]
}

import { Edge } from './Edge'
import { PageInfo } from './PageInfo'

export interface Response<Node, Cursor> {
    edges: Edge<Node, Cursor>[]
    pageInfo: PageInfo
}

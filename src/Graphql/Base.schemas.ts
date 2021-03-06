import { gql } from 'apollo-server'

export const BaseSchema = gql`
    type PageInfo {
        hasNextPage: Boolean
        hasPreviousPage: Boolean
        startCursor: String
        endCursor: String
        first: Int
        total: Int
    }

    interface Node {
        id: ID
    }

    interface Edge {
        node: Node
        cursor: String
    }

    interface Connection {
        edges: [Edge]
        pageInfo: PageInfo!
    }
`

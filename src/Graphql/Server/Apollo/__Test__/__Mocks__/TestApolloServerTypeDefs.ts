import { gql } from 'apollo-server'
import { ApolloServerTypeDefs } from '../..'

const testSchema = gql`
    type Test {
        id: ID
        description: String
    }

    type Query {
        test(id: Int): Test
    }
`

export class TestApolloServerTypeDefs implements ApolloServerTypeDefs {
    getSchemas(): any[] {
        return [testSchema]
    }
}

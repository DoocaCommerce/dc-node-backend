import { ApolloServerResolvers } from '../..'

const resolver = {
    Query: {
        test: () => ({ id: 1, description: 'Test 1' })
    }
}

export class TestApolloServerResolvers implements ApolloServerResolvers {
    getResolvers(): any[] {
        return [resolver]
    }
}

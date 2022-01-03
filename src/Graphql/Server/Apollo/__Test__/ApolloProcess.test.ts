import { gql } from 'apollo-server'
import { ApolloProcess } from '..'
import {
    TestApolloServerResolvers,
    TestApolloServerTypeDefs,
    TestApolloProcess
} from './__Mocks__/'

describe('Apollo run server', () => {
    let process: ApolloProcess

    beforeAll(() => {
        process = new TestApolloProcess(
            new TestApolloServerTypeDefs(),
            new TestApolloServerResolvers()
        )
    })

    it('execute query', done => {
        const query = gql`
            {
                test(id: 1) {
                    id
                    description
                }
            }
        `

        process.getServer().map(async server => {
            const response = await server.executeOperation({ query })
            expect(response.errors).toBeUndefined()
            expect(response.data?.test.id).toBe('1')
            done()
        })
    })
})

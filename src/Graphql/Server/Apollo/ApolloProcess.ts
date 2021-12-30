import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'
import { ApolloServerResolvers } from './ApolloServerResolvers'
import { ApolloServerTypeDefs } from './ApolloServerTypeDefs'
import { Application, Process } from '../../..'
import { ApolloServerContext } from './ApolloServerContext'
import { ApolloServer } from 'apollo-server'

export abstract class ApolloProcess implements Process {
    constructor(
        private typeDefs: ApolloServerTypeDefs,
        private resolvers: ApolloServerResolvers,
        private context?: ApolloServerContext
    ) {}

    private getTypeDefs(): any {
        return mergeTypeDefs(this.typeDefs.getSchemas())
    }

    private getResolvers(): any {
        return mergeResolvers(this.resolvers.getResolvers())
    }

    private getContext(): any {
        return ({ req }: any) => this.context?.handlerContext(req)
    }

    async execute(app: Application): Promise<void> {
        const server = new ApolloServer({
            typeDefs: this.getTypeDefs(),
            resolvers: this.getResolvers(),
            context: this.getContext()
        })

        server.listen().then(({ url }) => {
            console.log(url)
        })
    }
}

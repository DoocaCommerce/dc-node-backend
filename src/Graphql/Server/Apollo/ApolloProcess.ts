import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'
import { ApolloServerResolvers } from './ApolloServerResolvers'
import { ApolloServerTypeDefs } from './ApolloServerTypeDefs'
import { Application, Maybe, Process } from '../../..'
import { ApolloServerContext } from './ApolloServerContext'
import { ApolloServer } from 'apollo-server'

export abstract class ApolloProcess implements Process {
    private isRunning: boolean = false
    private server?: ApolloServer

    constructor(
        private typeDefs: ApolloServerTypeDefs,
        private resolvers: ApolloServerResolvers,
        private context?: ApolloServerContext
    ) {
        this.server = new ApolloServer({
            typeDefs: this.getTypeDefs(),
            resolvers: this.getResolvers(),
            context: this.getContext()
        })
    }

    async execute(app: Application): Promise<void> {
        this.server?.listen().then(({ url }) => {
            console.log(url)
            this.isRunning = true
        })
    }

    serverIsRunning(): boolean {
        return this.isRunning
    }

    getServer(): Maybe<ApolloServer> {
        return Maybe.of(this.server)
    }

    private getTypeDefs(): any {
        return mergeTypeDefs(this.typeDefs.getSchemas())
    }

    private getResolvers(): any {
        return mergeResolvers(this.resolvers.getResolvers())
    }

    private getContext(): any {
        return ({ req }: any) => this.context?.handlerContext(req)
    }
}

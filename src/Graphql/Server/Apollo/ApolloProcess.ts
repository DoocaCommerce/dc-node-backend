import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge'
import { ApolloServer } from 'apollo-server'
import { Application, Maybe, Process } from '../../..'
import { ApolloServerContext } from './ApolloServerContext'
import { ApolloServerDataSources } from './ApolloServerDataSources'
import { ApolloServerResolvers } from './ApolloServerResolvers'
import { ApolloServerTypeDefs } from './ApolloServerTypeDefs'

export interface ApolloServerConfig {
    port?: number
}
export abstract class ApolloProcess implements Process {
    private isRunning: boolean = false
    private server?: ApolloServer

    constructor(
        private typeDefs: ApolloServerTypeDefs,
        private resolvers: ApolloServerResolvers,
        private context?: ApolloServerContext,
        private config?: ApolloServerConfig,
        private dataSources?: ApolloServerDataSources
    ) {
        this.server = new ApolloServer({
            typeDefs: this.getTypeDefs(),
            resolvers: this.getResolvers(),
            context: this.getContext(),
            dataSources: this.dataSources?.create()
        })
    }

    async execute(app: Application): Promise<void> {
        this.server?.listen({ port: this.config?.port || 4000 }).then(({ url }) => {
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

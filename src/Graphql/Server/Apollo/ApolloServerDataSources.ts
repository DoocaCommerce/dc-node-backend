export type DataSourceFunction<T = any> = () => { [key: string]: T }

export interface ApolloServerDataSources {
    create(): DataSourceFunction
}

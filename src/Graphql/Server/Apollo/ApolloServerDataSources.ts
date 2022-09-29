import { RESTDataSource } from 'apollo-datasource-rest'

export type DataSourceFunction = () => { [key: string]: RESTDataSource }

export interface ApolloServerDataSources {
    create(): DataSourceFunction
}

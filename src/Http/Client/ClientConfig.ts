import { HttpMethodEnum } from '../HttpMethodEnum'

export interface ClientConfig {
    method: HttpMethodEnum
    url: string
    payload?: object
    headers?: Record<string, string>
}

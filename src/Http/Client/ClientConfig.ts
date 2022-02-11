import { Json } from '../../Base'
import { HttpMethodEnum } from '../HttpMethodEnum'

export interface ClientConfig {
    method: HttpMethodEnum
    url: string
    payload?: Json
    headers?: Record<string, string>
}

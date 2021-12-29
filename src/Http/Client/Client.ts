import { ClientConfig } from './ClientConfig'
import { ClientResponse } from './ClientResponse'

export interface Client {
    request(config: ClientConfig): Promise<ClientResponse>
}

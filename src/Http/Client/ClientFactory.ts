import { AxiosClient } from './Axios'
import { Client } from './Client'
import { ClientEnum } from './ClientEnum'

export class ClientFactory {
    static getInstance(clientProvider: ClientEnum = ClientEnum.AXIOS): Client {
        return new AxiosClient()
    }
}

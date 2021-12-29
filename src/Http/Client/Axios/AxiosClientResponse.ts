import { AxiosResponse } from 'axios'
import { ClientResponse } from '../ClientResponse'

export class AxiosClientResponse implements ClientResponse {
    constructor(private response: AxiosResponse) {}

    getStatusCode(): number {
        return this.response.status
    }

    getData() {
        return this.response.data
    }
}

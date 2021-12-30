import { ClientResponse } from '../../../Client'

export class TestClientResponse implements ClientResponse {
    constructor(private data: any, private statusCode: number = 200) {}

    getStatusCode(): number {
        return this.statusCode
    }

    getData() {
        return this.data
    }
}

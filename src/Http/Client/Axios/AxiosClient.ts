import { Client } from '../Client'
import { ClientConfig } from '../ClientConfig'
import { ClientResponse } from '../ClientResponse'
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { AxiosClientResponse } from './AxiosClientResponse'

export class AxiosClient implements Client {
    private client: AxiosInstance

    constructor(config?: AxiosRequestConfig) {
        this.client = axios.create(config)
    }

    async request(config: ClientConfig): Promise<ClientResponse> {
        const data = await this.client.request({
            url: config.url,
            method: config.method,
            headers: config.headers,
            data: config.payload
        })

        return new AxiosClientResponse(data)
    }
}

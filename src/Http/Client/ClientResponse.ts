export interface ClientResponse<T = any> {
    getStatusCode(): number
    getData(): T
}

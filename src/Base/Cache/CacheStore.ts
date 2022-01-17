export interface CacheStoreSaveParams {
    key: string
    data: any
    expirationTime?: number
}

export interface CacheStore {
    save(params: CacheStoreSaveParams): Promise<any>
    remove(key: string): Promise<void>
    getBy(key: string): Promise<any>
}

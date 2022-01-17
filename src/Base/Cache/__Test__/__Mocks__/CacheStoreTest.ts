import { CacheStore, CacheStoreSaveParams } from '../../CacheStore'

export class CacheStorageTest implements CacheStore {
    private data: Record<string, any> = []

    async save(params: CacheStoreSaveParams): Promise<any> {
        this.data[params.key] = params.data
        return this.data[params.key]
    }

    async remove(key: string): Promise<void> {
        delete this.data[key]
    }

    getBy(key: string): Promise<any> {
        return this.data[key]
    }
}

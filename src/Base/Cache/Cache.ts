import { container } from 'tsyringe'
import { filled, isEmpty } from '../../Helpers'
import { CacheKeyBuilder } from './CacheKeyBuilder'
import { CacheKeyNotFoundDoocaException } from './CacheKeyNotFoundDoocaException'
import { CacheStore } from './CacheStore'
import { CacheTypeEnum } from './CacheTypeEnum'

export type CreateDataCache<T = any> = () => Promise<T>

export interface CacheKeyParams {
    key?: string
    builder?: CacheKeyBuilder
}

export interface CacheParams extends CacheKeyParams {
    expirationTime?: number
}

export interface CacheRememberParams<T = any> extends CacheParams {
    data: T
}

export class Cache {
    private store: CacheStore
    private defaultExpirationTime = 15 * 1000

    constructor() {
        this.store = container.resolve<CacheStore>(CacheTypeEnum.STORE)
    }

    async get<T = any>(params: CacheParams): Promise<T | null> {
        return (await this.store.getBy(Cache.getKeyCache(params))) || null
    }

    async getOrRemember<T = any>(params: CacheParams, createData: CreateDataCache<T>): Promise<T> {
        let data = await this.get<T>(params)
        if (filled(data)) return data as T
        return this.remember<T>({ ...params, data: await createData() })
    }

    remember<T = any>(params: CacheRememberParams): Promise<T> {
        const { data } = params
        const expirationTime = params.expirationTime || this.defaultExpirationTime
        const key = Cache.getKeyCache(params)
        return this.store.save({ key, data, expirationTime })
    }

    forgot(params: CacheParams): Promise<void> {
        return this.store.remove(Cache.getKeyCache(params))
    }

    private static getKeyCache({ key, builder }: CacheKeyParams): string {
        let keyCache = key

        if (isEmpty(keyCache)) {
            keyCache = builder?.getKey()
        }

        if (isEmpty(keyCache)) {
            throw new CacheKeyNotFoundDoocaException()
        }

        return keyCache as string
    }
}

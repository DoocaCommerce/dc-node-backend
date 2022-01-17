import 'reflect-metadata'
import { container } from 'tsyringe'
import { CacheTypeEnum } from '../CacheTypeEnum'
import { CacheStorageTest } from './__Mocks__/CacheStoreTest'
import { Cache } from '../Cache'

const KEY = 'tst'

describe('Cache', () => {
    beforeAll(() => {
        container.registerSingleton(CacheTypeEnum.STORE, CacheStorageTest)
    })

    it('remember', async () => {
        const cache = new Cache()
        const data = await cache.remember({ data: { desc: 'test' }, key: KEY })
        expect(data).toHaveProperty('desc')
    })

    it('get', async () => {
        const cache = new Cache()
        const data = await cache.get({ key: KEY })
        expect(data).toHaveProperty('desc')
    })

    it('getOrRemember', async () => {
        const cache = new Cache()
        const key = 'tst2'

        let data = await cache.getOrRemember({ key }, async () => {
            return { describe: 'test' }
        })

        expect(data).toHaveProperty('describe')

        data = await cache.getOrRemember<any>({ key }, async () => {
            expect(true).toBe(false)
        })

        expect(data).toHaveProperty('describe')
    })

    it('forgot', async () => {
        const cache = new Cache()
        await cache.forgot({ key: KEY })
        const data = await cache.get({ key: KEY })
        expect(data).toBeNull()
    })
})

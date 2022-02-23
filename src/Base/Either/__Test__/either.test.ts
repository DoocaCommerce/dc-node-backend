import { Either, Left, Right } from '..'
import { MapCallback } from '../..'
import { either } from '../../../Helpers'

const TEST = 'test'

function test(cb: MapCallback): Either {
    try {
        return Right.of(cb(TEST))
    } catch (e) {
        return Left.of(e)
    }
}

describe('Either test', () => {
    it('Right', () => {
        const data = test(s => {
            expect(s).toEqual(TEST)
        })

        expect(data).toBeInstanceOf(Right)
    })

    it('Left', () => {
        const data = test(() => {
            throw Error(TEST)
        })

        expect(data).toBeInstanceOf(Left)
    })

    it('either', () => {
        const data = test(s => {
            expect(s).toEqual(TEST)
            return s
        })

        const success = (s: string) => `${s} -> Success`
        const error = (err: Error) => `${err.message} -> Error`

        const result = either(data, success, error)

        expect(result).toEqual(`${TEST} -> Success`)
    })
})

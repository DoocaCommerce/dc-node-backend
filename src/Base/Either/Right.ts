import { MapCallback } from '..'
import { Either } from './Either'

export class Right<T = any> implements Either<T> {
    private constructor(private value: T) {}

    map<R = any>(callback: MapCallback<T, R>): Right<R> {
        return Right.of<R>(callback(this.value))
    }

    unsafeValue(): T {
        return this.value
    }

    static of<T = any>(value: T): Right<T> {
        return new Right<T>(value)
    }
}

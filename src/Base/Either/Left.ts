import { MapCallback } from '..'
import { Either } from './Either'

export class Left<T = any> implements Either<T> {
    private constructor(private value: T) {}

    map<R = any>(callback: MapCallback<T, R>): Left<R> {
        return Left.of<R>(callback(this.value))
    }

    unsafeValue(): T {
        return this.value
    }

    static of<T = any>(value: T): Left<T> {
        return new Left<T>(value)
    }
}

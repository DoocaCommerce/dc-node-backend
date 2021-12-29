import { isEmpty } from '../Helpers'
import { MapCallback, Whatever } from './'

export class Maybe<T> {
    private constructor(private value: Whatever<T>) {}

    static of<T>(value: Whatever<T>): Maybe<T> {
        return new Maybe<T>(value)
    }

    static empty<T>(): Maybe<T> {
        return Maybe.of<T>(null)
    }

    isEmpty(): boolean {
        return isEmpty(this.value)
    }

    map<R>(callback: MapCallback<T, R>): Maybe<R> {
        if (this.isEmpty()) return Maybe.of<R>(null)
        return Maybe.of<R>(callback(this.value as T))
    }

    unsafeValue(): any {
        return this.value
    }
}

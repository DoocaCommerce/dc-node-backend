import { MapCallback } from '..'

export interface Either<T = any> {
    map<R = any>(callback: MapCallback<T, R>): Either<R | T>
    unsafeValue(): T
}

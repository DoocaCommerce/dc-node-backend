import { Presenter } from './Presenter'

export type PresenterConstructor<P, IN> = { new (value: IN): P }

export interface Transformer<T> {
    transform(presenter: Presenter<T>): T
}

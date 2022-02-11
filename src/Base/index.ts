export type Whatever<T> = T | null | undefined
export type MapCallback<T, R> = (value: T) => R

export { DataTypeEnum } from './DataTypeEnum'
export { Finder } from './Finder'
export { Image } from './Image'
export { Interpreter } from './Interpreter'
export { Maybe } from './Maybe'
export { Paginated } from './Paginated'
export { PaginatedFinder } from './PaginatedFinder'
export { Presenter } from './Presenter'
export { Transformer } from './Transformer'
export { FilterBase, PaginationFilter, TokenFilter } from './Filters'
export { Queue, QueueItem } from './Queue'
export { Converter } from './Converter'
export { Json } from './Json'
export {
    DoocaException,
    NotFoundDoocaException,
    NotImplementedYetDoocaException
} from './Exceptions'

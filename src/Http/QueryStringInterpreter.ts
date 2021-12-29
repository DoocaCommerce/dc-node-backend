import { isNotEmpty } from '../Helpers'
import { Interpreter } from '../Base'

export abstract class QueryStringInterpreter implements Interpreter<string> {
    private queryStr: string = ''

    protected getQuery(): string {
        return this.queryStr
    }

    protected hasQuery(): boolean {
        return isNotEmpty(this.queryStr)
    }

    append(query: string): string {
        return this.queryStr + '&' + query
    }

    static makeFilter(field: string, value: string): string {
        return `${field}=${value}`
    }

    abstract interpret(): string
}

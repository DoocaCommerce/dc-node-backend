import { DoocaException, NotImplementedYetDoocaException } from './src/Base'
import { isEmpty, isNotEmpty } from './src/Helpers'

interface LambdaResult {
    statusCode: number
    body: any
}

interface ErrorResponse {
    message: string
}

interface DynamoDbErrorResponse extends ErrorResponse {
    $response?: {
        statusCode: number
    }
}

interface ShoppingPrecoErrorResponse extends ErrorResponse {
    response?: {
        data: {
            message: string
            status: number
        }
    }
}

interface Satisfier {
    isSatisfied(): boolean
}

interface ErrorInterpreter extends Satisfier {
    toLambdaResult(): LambdaResult
}

class DynamoDbErrorInterpreter implements ErrorInterpreter {
    constructor(private err: Error) {}

    toLambdaResult(): LambdaResult {
        const err = this.err as DynamoDbErrorResponse
        return {
            statusCode: err.$response.statusCode,
            body: err.message
        }
    }

    isSatisfied(): boolean {
        const hasResponse = (key: string) => key === '$response'
        return isNotEmpty(Object.keys(this.error).find(hasResponse))
    }
}

class ShoppingPrecosErrorInterpreter implements ErrorInterpreter {
    constructor(protected error: Error) {}

    toLambdaResult(): LambdaResult {
        const err = this.error as ShoppingPrecoErrorResponse
        return {
            statusCode: err.response.data.status,
            body: err.response.data.message
        }
    }

    isSatisfied(): boolean {
        const hasResponse = (key: string) => key === 'response'
        return isNotEmpty(Object.keys(this.error).find(hasResponse))
    }
}

abstract class LambdaDoocaExceptionFactory {
    static getLambdaResult(err: Error): LambdaResult {
        const interpreters: ErrorInterpreter[] = [
            new DynamoDbErrorInterpreter(err),
            new ShoppingPrecosErrorInterpreter(err)
        ]

        const oneInterpreter = (satisfier: Satisfier) => satisfier.isSatisfied()

        const interpreter = interpreters.find(oneInterpreter)
        if (isEmpty(interpreter)) throw new NotImplementedYetDoocaException()

        return interpreter.toLambdaResult()
    }
}

LambdaDoocaExceptionFactory.getLambdaResult()

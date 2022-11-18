import { DEFAULT_HEADERS } from '../headers';

export interface LambdaError {
    statusCode: number;
    message: string;
    timeOfError: string;
    location?: string;
}

export class BadRequestError implements LambdaError {
    statusCode: number;
    message: string;
    timeOfError: string;
    constructor(message: string) {
        this.statusCode = 400;
        this.message = message;
        this.timeOfError = new Date(Date.now()).toUTCString();
        this.throwError();
    }

    private throwError() {
        throw {
            statusCode: this.statusCode,
            message: this.message,
            timeOfError: this.timeOfError,
        };
    }
}

export class NotFoundError implements LambdaError {
    statusCode: number;
    message: string;
    timeOfError: string;
    constructor(message: string) {
        this.statusCode = 404;
        this.message = message;
        this.timeOfError = new Date(Date.now()).toUTCString();
        this.throwError();
    }

    private throwError() {
        throw {
            statusCode: this.statusCode,
            message: this.message,
            timeOfError: this.timeOfError,
        };
    }
}

export class LambdaProxyErrorHandler implements LambdaError {
    statusCode: number;
    message: string;
    timeOfError: string;
    constructor(error: any) {
        this.message = error.message || 'internal server error';
        this.statusCode = error.statusCode || 500;
        this.timeOfError = error.timeOfError || new Date(Date.now()).toUTCString();
    }

    customResponse() {
        return {
            statusCode: 500,
            headers: {
                ...DEFAULT_HEADERS,
            },
            body: JSON.stringify({
                status: 'Error Signing Up',
                error: {
                    statusCode: this.statusCode,
                    message: this.message,
                    timeOfError: this.timeOfError,
                },
            }),
            isBase64Encoded: false,
        };
    }
}

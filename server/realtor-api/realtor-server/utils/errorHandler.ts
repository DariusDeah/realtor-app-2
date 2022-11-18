interface LambdaError {
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

interface LambdaError {
    statusCode: number;
    message: string;
    timeOfError: string;
    location?: string;
}

export class BadRequest implements LambdaError {
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
            error: {
                statusCode: this.statusCode,
                message: this.message,
                timeOfError: this.timeOfError,
            },
        };
    }
}

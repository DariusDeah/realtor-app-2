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
        this.logError();
        this.throwError();
    }

    private logError() {
        console.error(this);
    }
    private throwError() {
        throw {
            statusCode: this.statusCode,
            message: this.message,
            timeOfError: this.timeOfError,
        };
    }
}

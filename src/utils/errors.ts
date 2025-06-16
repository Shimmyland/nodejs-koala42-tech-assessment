export class CustomError extends Error {
    // Error atributes = name, message, stack + statusCode, isOperational?
    statusCode: number

    constructor(message: string, statusCode: number) {
        super(message)
        this.statusCode = statusCode
        //Error.captureStackTrace(this, this.constructor)
    }
}

// other custom errors: ConfigError, ValidationError, ApiError

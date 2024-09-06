export class ErrorResponse extends Error {
    status: number;
    errorMessage: string;

    constructor(status: number, errorMessage: string) {
        super(errorMessage);
        this.status = status;
        this.name = this.constructor.name; // Set the error name to the class name
        Error.captureStackTrace(this, this.constructor); // Capture stack trace
    }
}

export class NoChangeError extends ErrorResponse {
    constructor() {
        super(304, "No change");
    }
}

export class NotFoundError extends ErrorResponse {
    constructor(message: string) {
        super(404, "Not Found: " + message);
    }
}

export class BadRequestError extends ErrorResponse {
    constructor(message: string) {
        super(400, "BadRequest: " + message);
    }
}

export class InternalServerError extends ErrorResponse {
    constructor(message: string) {
        super(500, "Internal Server Error: " + message);
    }
}

export class UnauthorisedError extends ErrorResponse {
    constructor(message: string) {
        super(401, "Unauthorised: " + message);
    }
}
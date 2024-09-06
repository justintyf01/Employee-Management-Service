"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerError = exports.BadRequestError = exports.NotFoundError = exports.NoChangeError = exports.ErrorResponse = void 0;
class ErrorResponse extends Error {
    constructor(status, errorMessage) {
        super(errorMessage);
        this.status = status;
        this.name = this.constructor.name; // Set the error name to the class name
        Error.captureStackTrace(this, this.constructor); // Capture stack trace
    }
}
exports.ErrorResponse = ErrorResponse;
class NoChangeError extends ErrorResponse {
    constructor() {
        super(304, "No change");
    }
}
exports.NoChangeError = NoChangeError;
class NotFoundError extends ErrorResponse {
    constructor(message) {
        super(404, "Not Found: " + message);
    }
}
exports.NotFoundError = NotFoundError;
class BadRequestError extends ErrorResponse {
    constructor(message) {
        super(400, "BadRequest: " + message);
    }
}
exports.BadRequestError = BadRequestError;
class InternalServerError extends ErrorResponse {
    constructor(message) {
        super(500, "Internal Server Error: " + message);
    }
}
exports.InternalServerError = InternalServerError;

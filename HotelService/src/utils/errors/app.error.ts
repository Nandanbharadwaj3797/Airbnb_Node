/**
 * @file app.error.ts
 */

/**
 * Interface representing a custom application error.
 */
export interface AppError extends Error {
    statusCode: number;
}

abstract class BaseAppError extends Error implements AppError {
    statusCode: number;

    constructor(message: string, statusCode: number, name: string) {
        super(message);
        this.statusCode = statusCode;
        this.name = name;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}


/**
 * Represents an internal server error.
 * Implements the `AppError` interface.
 *
 * @class InternalServerError
 * @implements {AppError}
 */
export class InternalServerError extends BaseAppError {
    constructor(message: string) {
        super(message, 500, "InternalServerError");
    }
}

/**
 * Represents a Bad Request error (HTTP 400).
 * This error is typically used to indicate that the server cannot process the request
 * due to client-side issues such as invalid input or malformed request syntax.
 *
 * @class BadRequestError
 * @implements {AppError}
 */
export class BadRequestError extends BaseAppError {
    constructor(message: string) {
        super(message, 400, "BadRequestError");
    }
}

/**
 * Represents a "Not Found" error.
 * Implements the `AppError` interface.
 * This error is typically used to indicate that a requested resource could not be found.
 *
 * @class NotFoundError
 * @implements {AppError}
 */
export class NotFoundError extends BaseAppError {
    constructor(message: string) {
        super(message, 404, "NotFoundError");
    }
}

/**
 * Represents an Unauthorized error (HTTP 401).
 * This error is typically used to indicate that the request requires user authentication.
 * 
 * @class UnauthorizedError
 * @implements {AppError}
 */
export class UnauthorizedError extends BaseAppError {
    constructor(message: string) {
        super(message, 401, "UnauthorizedError");
    }
}


/**
 * Represents a Forbidden error (HTTP 403).
 * This error is typically used to indicate that the server understands the request
 * but refuses to authorize it.
 * 
 * @class ForbiddenError
 * @implements {AppError}
 */
export class ForbiddenError extends BaseAppError {
    constructor(message: string) {
        super(message, 403, "ForbiddenError");
    }
}

/**
 * Represents a Conflict error (HTTP 409).
 * This error is typically used to indicate that the request could not be completed
 * due to a conflict with the current state of the target resource.
 * 
 * @class ConflictError
 * @implements {AppError}
 */
export class ConflictError extends BaseAppError {
    constructor(message: string) {
        super(message, 409, "ConflictError");
    }
}

/**
 * Represents an error for unimplemented functionality.
 * This error is used to indicate that a certain feature or method
 * has not been implemented yet.
 *
 * @class NotImplementedError
 * @implements {AppError}
 */
export class NotImplementedError extends BaseAppError {
    constructor(message: string) {
        super(message, 501, "NotImplementedError");
    }
}
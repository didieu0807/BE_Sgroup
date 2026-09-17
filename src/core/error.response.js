class apiError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name;
    }
}
export class BadRequestError extends apiError {
    constructor(message = 'Bad request'){
        super(400, message);
    }
}
export class UnauthorizedError extends apiError {
    constructor(message = 'Unauthorized'){
        super(401, message);
    }
}
export class ForbiddenError extends apiError {
    constructor(message = 'Forbidden'){
        super(403, message);
    }
}
export class NotFoundError extends apiError {
    constructor(message = 'Not Found'){
        super(404, message);
    }
}
export class ConflictError extends apiError {
  constructor(message = 'Conflict') {
    super(409, message);
  }
}

export default apiError;
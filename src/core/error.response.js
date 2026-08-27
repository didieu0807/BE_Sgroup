class apiError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name;
    }
}
export class badRequestError extends apiError {
    constructor(message = 'Bad request'){
        super(400, message);
    }
}
export class unauthorizedError extends apiError {
    constructor(message = 'Unauthorized'){
        super(401, message);
    }
}
export class forbiddenError extends apiError {
    constructor(message = 'Forbidden'){
        super(403, message);
    }
}
export class notFoundError extends apiError {
    constructor(message = 'Not Found'){
        super(404, message);
    }
}

export default apiError;
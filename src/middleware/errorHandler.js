import apiError from "../core/error.response.js";
const errorHandler = (err, req, res, next) => {
    console.error(`[ERROR] ${err.name}: ${err.message}`);

    if (err instanceof apiError) {
        const response = {
            success: false,
            message: err.message,
        };

        if (err.errors) response.errors = err.errors;
        return res.status(err.statusCode).json(response);
    }

    // Với mọi lỗi không mong muốn khác (lỗi hệ thống, DB, ...)
    return res.status(500).json({
        success: false,
        message: 'Internal Server Error',
    });
};

export default errorHandler;
import { validationResult, body } from 'express-validator';
import { BadRequestError } from '../core/error.response.js';

export const validate = (rules) => {
    return async (req, res, next) => {
        // Chạy tuần tự từng rule
        for (const rule of rules) {
            await rule.run(req); //tiến hành xác thực dữ liệu trên request
        }

        const errors = validationResult(req); //đối tượng result chứa các phương thức nội bộ: loại, ...
        if (errors.isEmpty()) {
            return next();
        }

        // Gộp tất cả lỗi thành mảng { field, message }
        //errors.array(): chuyển thành mảng javascript thực sự
        //errors.array().map(): duyệt qua từng phần tử của mảng cũ - biến đổi - trả về mảng mới (không thay đổi mảng cũ)
        const formattedErrors = errors.array().map((err) => ({
            field: err.path,
            message: err.msg,
        }));

        // Ném BadRequestError kèm danh sách lỗi chi tiết
        const error = new BadRequestError('Validation failed');
        error.errors = formattedErrors;
        return next(error);
    };
};

export const createUserRules = [
    body('name')
        .trim() // tự động xóa khoảng thừa ở 2 đầu chuỗi
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),

    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Email is not valid')
        .normalizeEmail(),

    body('age')
        .optional()
        .isInt({ min: 1, max: 120 }).withMessage('Age must be an integer between 1 and 120'),
];

export const updateUserRules = [
    body()
        .custom((value, { req }) => {
            const allowedFields = ['name', 'email', 'age'];
            const hasAllowedField = Object.keys(req.body).some((key) => allowedFields.includes(key));
            if (!hasAllowedField) {
                throw new Error('At least one field (name, email, age) must be provided for update');
            }
            return true;
        }),

    body('name')
        .optional()
        .trim()
        .notEmpty().withMessage('Name cannot be empty')
        .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),

    body('email')
        .optional()
        .trim()
        .notEmpty().withMessage('Email cannot be empty')
        .isEmail().withMessage('Email is not valid')
        .normalizeEmail(),

    body('age')
        .optional()
        .isInt({ min: 1, max: 120 }).withMessage('Age must be an integer between 1 and 120'),
];
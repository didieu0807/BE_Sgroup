import * as UploadService from "../service/upload.service.js";
import {BadRequestError} from "../core/error.response.js";
import catchAsync from "../utils/catchAsync.js";
import {SendSuccess} from "../utils/responseHelper.js";

export const uploadSingleImage = catchAsync(async (req, res) => {
    if (!req.file) {
        throw new BadRequestError("No file uploaded");
    }
    const fileData = await UploadService.handleUploadImage(req.file);
    return SendSuccess(res, 200, "Image uploaded successfully!", fileData);
});

export const uploadMultipleDocuments = catchAsync(async (req, res) => {
    if (!req.files || req.files.length === 0) {
        throw new BadRequestError("No files uploaded");
    }
    const fileData = await UploadService.handleUploadDocuments(req.files);
    return SendSuccess(res, 200, "Documents uploaded successfully!", fileData);
});

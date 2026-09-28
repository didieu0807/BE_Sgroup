
import { upload } from "../middleware/upload.middleware.js";
import { uploadSingleImage, uploadMultipleDocuments } from "../controller/upload.controller.js";
import { Router } from "express";

const router = Router();

router.post("/image", upload.single("image"), uploadSingleImage);

router.post("/documents", upload.array("documents", 5), uploadMultipleDocuments);

export default router;
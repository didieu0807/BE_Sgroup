import { Router } from "express";
import * as userController from "../controller/users.controller.js";

const router = Router();

router.get("/", userController.getAllUsers);
router.post("/", userController.createUsers);
router.put("/:id/", userController.updateUsers);
router.delete("/:id/", userController.deleteUsers);

// CRUD: create, read, update, delete

export default router;
import { Router } from "express";
import { verifyToken } from "../../middleware/verifyToken.js";
import {
  createTeacherService,
  getTeachers,
  getTeachersbyId,
} from "../../Services/Admin/teacherService.js";

const router = Router();

router.post("/create-teacher", verifyToken, createTeacherService);
router.get("/teacher/:id", verifyToken, getTeachersbyId);
router.get("/teachers", verifyToken, getTeachers);


export default router;

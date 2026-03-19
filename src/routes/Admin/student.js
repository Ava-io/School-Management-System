import { Router } from "express";
import { verifyToken } from "../../middleware/verifyToken.js";
import {
  createStudentService,
  deleteStudentbyId,
  editStudentById,
  getStudentbyId,
  getStudents,
} from "../../Services/Admin/studentService.js";
import { checkRole } from "../../middleware/checkRole.js";

const router = Router();

router.post(
  "/create-student",
  verifyToken,
  checkRole(["admin", "teacher"]),
  createStudentService,
);
router.get(
  "/student/:id",
  verifyToken,
  checkRole(["admin", "teacher"]),
  getStudentbyId,
);
router.get(
  "/students",
  verifyToken,
  checkRole(["admin", "teacher"]),
  getStudents,
);
router.patch(
  "/update-student/:id",
  verifyToken,
  checkRole(["admin", "teacher"]),
  editStudentById,
);
router.delete(
  "/delete-students/:id",
  verifyToken,
  checkRole(["admin", "teacher"]),
  deleteStudentbyId,
);

export default router;

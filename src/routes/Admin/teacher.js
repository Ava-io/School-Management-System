import { Router } from "express";
import { verifyToken } from "../../middleware/verifyToken.js";
import {
  createTeacherService,
  deleteTeachersbyId,
  editTeacherById,
  getTeachers,
  getTeachersbyId,
} from "../../Services/Admin/teacherService.js";
import { checkRole } from "../../middleware/checkRole.js";

const router = Router();

router.post(
  "/create-teacher",
  verifyToken,
  checkRole(["admin"]),
  createTeacherService,
);
router.get(
  "/get-teacher/:id",
  verifyToken,
  checkRole(["admin"]),
  getTeachersbyId,
);
router.get("/get-all-teachers", verifyToken, checkRole(["admin"]), getTeachers);

router.patch(
  "/edit-teacher/:id",
  verifyToken,
  checkRole(["admin"]),
  editTeacherById,
);
router.delete(
  "/delete-teacher/:id",
  verifyToken,
  checkRole(["admin"]),
  deleteTeachersbyId,
);

export default router;

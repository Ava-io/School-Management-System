import { Router } from "express";
import { verifyToken } from "../../middleware/verifyToken.js";
import {
  createSubjectService,
  deleteSubjectbyId,
  editSubById,
  getSubBYId,
  getSubjects,
} from "../../Services/Admin/subjectService.js";
import { checkRole } from "../../middleware/checkRole.js";

const router = Router();

router.post(
  "/create-subject",
  verifyToken,
  checkRole(["admin", "teacher"]),
  createSubjectService,
);
router.get(
  "/subject/:id",
  verifyToken,
  checkRole(["admin", "teacher"]),
  getSubBYId,
);
router.get(
  "/subjects",
  verifyToken,
  checkRole(["admin", "teacher"]),
  getSubjects,
);
router.patch(
  "/edit-subjects/:id",
  verifyToken,
  checkRole(["admin", "teacher"]),
  editSubById,
);
router.delete(
  "/delete-subject/:id",
  verifyToken,
  checkRole(["admin", "teacher"]),
  deleteSubjectbyId,
);
export default router;

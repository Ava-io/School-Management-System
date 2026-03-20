import { checkRole } from "../../middleware/checkRole.js";
import { Router } from "express";
import { verifyToken } from "../../middleware/verifyToken.js";
import {
  createAssignmentService,
  
  delAssById,
  
  editAssById,
  getAssById,
  getAssignments,
} from "../../Services/Admin/assignmentService.js";

const router = Router();

router.post(
  "/create-ass",
  verifyToken,
  checkRole(["teacher", "admin"]),
  createAssignmentService,
);
router.get(
  "/getAssignments",
  verifyToken,
  checkRole(["teacher", "admin"]),
  getAssignments,
);
router.get(
  "/getAssById/:id",
  verifyToken,
  checkRole(["admin", "teacher"]),
  getAssById,
);
router.patch(
  "/editAssById/:id",
  verifyToken,
  checkRole(["admin", "teacher"]),
  editAssById,
);
router.delete(
  "/delAssById/:id",
  verifyToken,
  checkRole(["admin", "teacher"]),
  delAssById
);

export default router;

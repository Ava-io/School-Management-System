import { Router } from "express";
import { verifyToken } from "../../middleware/verifyToken.js";
import { checkRole } from "../../middleware/checkRole.js";
import { createSubmissionService } from "../../Services/Admin/assignmentSubmissionService.js";

const router = Router();

router.post(
  "/create-submission",
  verifyToken,
  checkRole(["teacheer", "admin"]),
  createSubmissionService,
);

export default router;

import { Router } from "express";
import { verifyToken } from "../../middleware/verifyToken.js";
import { checkRole } from "../../middleware/checkRole.js";
import {
  createSubmissionService,
  getSubmissions,
} from "../../Services/Admin/assignmentSubmissionService.js";

const router = Router();

router.post(
  "/create-submission",
  verifyToken,
  checkRole(["student"]),
  createSubmissionService,
);

router.get(
  "/getSubmissions",
  verifyToken,
  checkRole(["teacher"]),
  getSubmissions,
);

// router.get(
//   "/getSubmissionById/:id",
//   verifyToken,
//   checkRole(["teacher"]),
//   getSubmissionById,
// );

// router.patch(
//   "/editSubmissionById/:id",
//   verifyToken,
//   checkRole(["admin", "teacher"]),
//   editSubmissionById,
// );

export default router;

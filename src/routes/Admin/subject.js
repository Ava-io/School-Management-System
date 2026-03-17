import { Router } from "express";
import { verifyToken } from "../../middleware/verifyToken.js";
import { createSubjectService, getSubBYId, getSubjects } from "../../Services/Admin/subjectService.js";

const router = Router();

router.post("/create-subject", verifyToken, createSubjectService);
router.get("subject/:id", verifyToken, getSubBYId);
router.get("/subjects", verifyToken, getSubjects);

export default router;
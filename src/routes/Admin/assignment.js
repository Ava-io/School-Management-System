import { checkRole } from "../../middleware/checkRole.js";
import { Router } from "express";
import { verifyToken } from "../../middleware/verifyToken.js";
import { createAssignmentService } from "../../Services/Admin/assignmentService.js";

const router = Router();

router.post("/create-ass", verifyToken, checkRole(["teacher", "admin"]), createAssignmentService);


export default router;
import { Router } from "express";
import { verifyToken } from "../../middleware/verifyToken.js";
import { createDepartmentService } from "../../Services/Admin/departmentService.js";


const router = Router();

router.post("/create-department", verifyToken, createDepartmentService);

export default router;
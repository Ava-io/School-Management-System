import { Router } from "express";
import { verifyToken } from "../../middleware/verifyToken.js";
import {
  createDepartmentService,
  deletedeptbyId,
  editDeptbyId,
  getDepartments,
  getDeptbyId,
} from "../../Services/departmentService.js";
import { checkRole } from "../../middleware/checkRole.js";

const router = Router();

router.post(
  "/create-department",
  verifyToken,
  checkRole(["admin"]),
  createDepartmentService,
);
router.get("/getalldept", verifyToken, checkRole(["admin"]), getDepartments);
router.get("/getdeptbyId/:id", verifyToken, checkRole(["admin"]), getDeptbyId);
router.patch(
  "/editDeptbyId/:id",
  verifyToken,
  checkRole(["admin"]),
  editDeptbyId,
);
router.delete(
  "/deleteDeptbyId/:id",
  verifyToken,
  checkRole(["admin"]),
  deletedeptbyId,
);

export default router;

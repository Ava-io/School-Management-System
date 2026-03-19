import { Router } from "express";
import { verifyToken } from "../../middleware/verifyToken.js";
import { createSchool, deleteSchbyId, editSchbyId, getSchById, getSchools } from "../../Services/Admin/schoolService.js";
import { checkRole } from "../../middleware/checkRole.js";

const router = Router();

router.post("/create-school", verifyToken, checkRole(["admin"]), createSchool);
router.get("/get-school/:id", verifyToken, checkRole(["admin"]), getSchById);
router.get("/get-schools", verifyToken, checkRole(["admin"]), getSchools);
router.patch(
  "/edit-school/:id",
  verifyToken,
  checkRole(["admin"]),
  editSchbyId,
);
router.delete(
  "/delete-school/:id",
  verifyToken,
  checkRole(["admin"]),
  deleteSchbyId,
);

export default router;

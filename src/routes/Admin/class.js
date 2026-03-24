import { Router } from "express";
import { checkRole } from "../../middleware/checkRole.js";
import { verifyToken } from "../../middleware/verifyToken.js";
import {
  createClassService,
  delclassbyId,
  editClassbyId,
  getClass,
  getClassById,
} from "../../Services/classService.js";

const router = Router();

router.post(
  "/create-class",
  verifyToken,
  checkRole(["admin"]),
  createClassService,
);
router.get("/get-classes", verifyToken, checkRole(["admin"]), getClass);
router.get("/getclassbyId/:id", verifyToken, checkRole, getClassById);
router.patch(
  "/editclassbyId/:id",
  verifyToken,
  checkRole(["admin"]),
  editClassbyId,
);
router.delete("/delClassById/:id", verifyToken, checkRole(["admin"]), delclassbyId);

export default router;

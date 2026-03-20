import { Router } from "express";
import { verifyToken } from "../../middleware/verifyToken.js";
import { checkRole } from "../../middleware/checkRole.js";
import {
  createPrefectService,
  delPrefectById,
  editPrefectById,
  getPrefectById,
  getPrefects,
} from "../../Services/Admin/prefectService.js";

const router = Router();

router.post(
  "/create-prefect",
  verifyToken,
  checkRole(["admin", "teacher"]),
  createPrefectService,
);

router.get(
  "/getprefects",
  verifyToken,
  checkRole(["admin", "teacher"]),
  getPrefects,
);
router.get(
  "/getPrefectById/:id",
  verifyToken,
  checkRole(["admin", "teacher"]),
  getPrefectById,
);

router.patch(
  "/editPrefectById/:id",
  verifyToken,
  checkRole(["admin", "teacher"]),
  editPrefectById,
);
router.delete(
  "/delPrefectById/:id",
  verifyToken,
  checkRole(["admin", "teacher"]),
  delPrefectById,
);

export default router;

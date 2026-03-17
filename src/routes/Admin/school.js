import { Router } from "express";
import { verifyToken } from "../../middleware/verifyToken.js";
import { getSchById, getSchools } from "../../Services/Admin/schoolService.js";

const router = Router();

router.post("/create-school", verifyToken, getSchools);
router.get("/school/:id", verifyToken, getSchById);
router.get("/schools", verifyToken, getSchools);

export default router;

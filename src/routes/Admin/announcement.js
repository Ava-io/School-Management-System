import { checkRole } from "../../middleware/checkRole.js";
import { Router } from "express";
import { createAnnouncementService } from "../../Services/Admin/announcementService.js";
import { verifyToken } from "../../middleware/verifyToken.js";

const router = Router();

router.post("/create-announcement", verifyToken,checkRole(["admin", "teacher"]), createAnnouncementService);


export default router;
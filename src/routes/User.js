import { Router } from "express";
import {
  deleteSchoolsByIdService,
  deleteSchoolsService,
} from "../Services/Auth/deleteUserService.js";

const router = Router();

router.delete("/deleteuser", deleteSchoolsService);
router.delete("/delete_school/:id", deleteSchoolsByIdService);

export default router;

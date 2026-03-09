import { Router } from "express";
import SignupService from "../../Services/Auth/signupService.js";
import SigninService from "../../Services/Auth/signinService.js";

const router = Router();

router.post("/signup", SignupService);
router.post("/signin", SigninService);

export default router;

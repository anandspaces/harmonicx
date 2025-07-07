import { Router } from "express";
import { authCallback, googleAuthRedirect, googleAuthCallback } from "../controller/auth.controller.js";

const router = Router();

router.post("/callback", authCallback);
router.get("/google", googleAuthRedirect);
router.get("/google/callback", googleAuthCallback);

export default router;

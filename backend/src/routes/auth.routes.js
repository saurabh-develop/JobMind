import express from "express";
import {
  register,
  login,
  verifyOtp,
  refreshToken,
  googleCallback,
  googleAuth,
  getMe,
} from "../controllers/auth.controllers.js";
import { authenticate } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.post("/register", register);
router.post("/verify-otp", verifyOtp);
router.post("/login", login);
router.post("refresh-token", refreshToken);
router.get("/google", googleAuth);
router.get("/google/callback", googleCallback);
router.get("/me", authenticate, getMe);

export default router;

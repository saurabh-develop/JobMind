import express from "express";
import {
  register,
  login,
  verifyOtp,
  refreshToken,
  googleAuthCallback,
} from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/register", register);
router.post("/verify-otp", verifyOtp);
router.post("/login", login);
router.post("refresh-token", refreshToken);
router.get("/google/callback", googleAuthCallback);

export default router;

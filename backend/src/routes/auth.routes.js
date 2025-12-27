import express from "express";
import {
  register,
  login,
  verifyOtp,
  refreshToken,
} from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/register", register);
router.post("/verify-otp", verifyOtp);
router.post("/login", login);
router.post("refresh-token", refreshToken);

export default router;

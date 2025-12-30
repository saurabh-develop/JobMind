import express from "express";
import { optimizeResume } from "../controllers/resumeOptimization.controllers";
import { authenticate } from "../middlewares/auth.middlewares";

const router = express.Router();

router.post("/optimize", authenticate, optimizeResume);

export default router;

import express from "express";
import { optimizeResume } from "../controllers/resumeOptimization.controllers.js";
import { authenticate } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.post("/optimize", authenticate, optimizeResume);

export default router;

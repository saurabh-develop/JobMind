import express from "express";
import multer from "multer";
import { uploadResume } from "../controllers/resume.controllers.js";
import { authenticate } from "../middlewares/auth.middlewares.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("upload", authenticate, upload.single("resume"), uploadResume);

export default router;

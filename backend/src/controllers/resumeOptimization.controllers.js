import Resume from "../models/resume.model.js";
import ResumeOptimization from "../models/resumeOptimization.model.js";
import { optimizeResumeWithAI } from "../services/resumeOptimizationAI.service.js";

export const optimizeResume = async (req, res) => {
  const userId = req.user.id;
  const { targetRole, jobDescription } = req.body;

  const resume = await Resume.findOne({ userId }).sort({ version: -1 });

  if (!resume || !resume.parsedData) {
    return res.status(400).json({
      message: "Resume not parsed yet",
    });
  }

  const optimization = await optimizeResumeWithAI(
    resume.parsedData,
    targetRole,
    jobDescription
  );

  const record = await ResumeOptimization.create({
    userId,
    resumeId: resume._id,
    target: targetRole,
    ...optimization,
  });
  res.json(record);
};

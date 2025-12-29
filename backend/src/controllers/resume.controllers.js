import Resume from "../models/resume.model.js";
import { uploadToCloudinary } from "../services/cloudinary.service.js";
import { resumeQueue } from "../queues/resume.queue.js";
import fs from "fs";

export const uploadResume = async (req, res) => {
  const userId = req.user.id;
  const filePath = req.file.path;

  const lastResume = await Resume.findOne({ userId }).sort({ version: -1 });
  const version = lastResume ? lastResume.version + 1 : 1;
  const cloudinaryRes = await uploadToCloudinary(filePath);

  fs.unlinkSync(filePath);

  const resume = await Resume.create({
    userId,
    version,
    cloudinaryUrl: cloudinaryRes.secure_url,
    parsedData: null,
  });

  await resumeQueue.add("parseResume", {
    resumeId: resume._id,
    userId,
    cloudinaryUrl: resume.cloudinaryUrl,
  });

  res.status(201).json({
    message: "Resume uploaded. Parsing started.",
    resumeId: resume._id,
    version,
  });
};

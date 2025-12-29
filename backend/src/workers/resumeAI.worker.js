import Resume from "../models/resume.model.js";
import { resumeQueue } from "../queues/resume.queue";
import { parseResumeWithAI } from "../services/resumeAI.service.js";
import { upsertSkillsForUser } from "../services/skill.service.js";
import { updateUserProfileFromResume } from "../services/userProfile.service.js";

resumeQueue.process("parseResume", async (job) => {
  const { resumeId, userId, cloudinaryUrl } = job.data;

  const aiData = await parseResumeWithAI(cloudinaryUrl);

  await Resume.findByIdAndUpdate(resumeId, {
    parsedData: aiData,
  });

  await upsertSkillsForUser(userId, aiData.skills);

  await updateUserProfileFromResume(userId, aiData);
});

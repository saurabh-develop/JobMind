import Skill from "../models/skill.model.js";
import UserSkill from "../models/userSkill.model.js";

export const upsertSkillsForUser = async (userId, skills) => {
  for (const skill of skills) {
    let skillDoc = await Skill.findOne({
      name: new RegExp(`^${skill.name}$`, "i"),
    });
    if (!skillDoc) {
      skillDoc = await Skill.create({ name: skill.name });
    }

    await UserSkill.findOneAndUpdate(
      { userId, skillId: skillDoc._id },
      {
        confidenceScore: skill.confidence,
        yearsOfExperience: skill.years,
        source: "resume",
      },
      { upsert: true, new: true }
    );
  }
};

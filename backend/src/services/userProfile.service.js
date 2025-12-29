import UserProfile from "../models/userProfile.model.js";
import userSkillModel from "../models/userSkill.model";

export const updateUserProfileFromResume = async (userSkillModel, aiData) => {
  await UserProfile.findOneAndUpdate(
    { userId },
    {
      totalExperience: aiData.totalExperience,
      preferredLocations: aiData.locations,
    },
    {
      upsert: true,
      new: true,
    }
  );
};

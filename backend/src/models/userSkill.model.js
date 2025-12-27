import mongoose from "mongoose";

const userSkillSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    skillId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Skill",
      required: true,
      index: true,
    },
    confidenceScore: {
      type: Number,
      min: 0,
      max: 1,
      default: 0.5,
    },
    yearsOfExperience: {
      type: Number,
      default: 0,
    },
    source: {
      type: String,
      enum: ["resume", "manual", "ai"],
      default: "resume",
    },
  },
  { timestamps: true }
);

userSkillSchema.index({ userId: 1, skillId: 1 }, { unique: true });

export default mongoose.model("UserSkill", userSkillSchema);

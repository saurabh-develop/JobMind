import mongoose from "mongoose";

const resumeOptimizationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
      required: true,
    },
    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
    },
    target: {
      type: String,
      required: true,
    },
    missingSkills: [String],
    atsKeywordsMissing: [String],
    matchScore: {
      type: Number,
    },
    bulletSuggestions: [
      {
        original: String,
        improved: String,
      },
    ],
    aiVersion: {
      type: String,
      default: "v1",
    },
  },
  { timestamps: true }
);

resumeOptimizationSchema.index({ userId: 1, resumeId: 1 });

export default mongoose.model("ResumeOptimization", resumeOptimizationSchema);

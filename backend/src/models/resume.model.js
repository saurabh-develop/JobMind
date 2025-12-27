import mongoose, { version } from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
      required: true,
    },
    version: {
      type: Number,
      required: true,
    },
    cloudinaryUrl: {
      type: String,
      required: true,
    },
    parsedData: {
      type: Object, // raw AI response (skills, exp, education)
    },
  },
  { timestamps: true }
);

resumeSchema.index({ userId: 1, version: -1 });

export default mongoose.model("Resume", resumeSchema);

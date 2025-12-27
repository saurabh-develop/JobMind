import mongoose from "mongoose";

const salarySchema = new mongoose.Schema(
  {
    min: Number,
    max: Number,
    currency: {
      type: String,
      default: "INR",
    },
  },
  { _id: false }
);

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      index: true,
    },
    company: {
      type: String,
      required: true,
      index: true,
    },
    locations: {
      type: String,
      index: true,
    },
    isRemote: {
      type: Boolean,
      default: false,
      index: true,
    },
    employmentType: {
      type: String,
      enum: ["full-time", "internship", "contract"],
      index: true,
    },
    experienceRequired: {
      min: Number,
      max: Number,
    },
    salary: salarySchema,
    skillsRequired: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skill",
        index: true,
      },
    ],
    description: {
      type: String,
    },
    source: {
      type: String,
      index: true,
    },
    sourceJobId: {
      type: String,
      index: true,
    },
    jobhash: {
      type: String,
      unique: true,
      index: true,
    },
    postedAt: {
      type: Date,
      index: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  { timestamps: true }
);

jobSchema.index({ title: "text", description: "text" });
jobSchema.index({ locationL: 1, isRemote: 1 });
jobSchema.index({ postedAt: -1 });

export default mongoose.model("Job", jobSchema);

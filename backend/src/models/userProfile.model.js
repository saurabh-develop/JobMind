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

const userProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
      required: true,
      index: true,
    },
    totalExperience: {
      type: Number,
      default: 0,
    },
    preferredLocations: [
      {
        type: String,
        index: true,
      },
    ],
    remotePreference: {
      type: String,
      enum: ["remote", "hybrid", "onsite"],
      default: "remote",
    },
    expectedSalary: salarySchema,
    jobTypes: [
      {
        type: String,
        enum: ["full-time", "internship", "contract"],
      },
    ],
    noticePeriod: {
      type: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model("UserProfile", userProfileSchema);

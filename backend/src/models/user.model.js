import mongoose from "mongoose";

const oauthProviderSchema = new mongoose.Schema(
  {
    provider: {
      type: String,
      enum: ["google"],
      required: true,
    },
    providerId: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    password: {
      type: String,
      required: false,
    },
    oauthProviders: [oauthProviderSchema],
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    tokenVersion: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
